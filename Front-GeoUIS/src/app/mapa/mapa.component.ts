import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

//Openlayers
import { View, Map, Overlay, Feature } from 'ol';
import { Point } from 'ol/geom';
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat, transform } from 'ol/proj';
import OSM from 'ol/source/OSM';
import BingMaps from 'ol/source/BingMaps';
import VectorSource from 'ol/source/Vector';
import TileWMS from 'ol/source/TileWMS';
import { Circle, Fill, Stroke, Style } from 'ol/style';
import * as olEasing from 'ol/easing';

//LayerSwitcher
import LayerSwitcher, { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';

//ol-ext
// @ts-ignore
import Search from "ol-ext/control/Search";
import { ActivatedRoute } from '@angular/router';
import { MuestrasService } from '../muestras/services/muestras.service';
import { Muestra } from '../muestras/interfaces/muestra.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css',
    '../../../node_modules/ol-ext/dist/ol-ext.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapaComponent implements OnInit {

  public map: Map | undefined;



  constructor(private activatedRoute: ActivatedRoute,
    private muestrasService: MuestrasService) { }

  async ngOnInit(): Promise<void> {

    //Features
    const muestras: Muestra[] = await firstValueFrom(this.muestrasService.getMuestras())

    let markerFeatures: Feature[] = [];
    let positions: any[] = [];
    //Estilos de las features
    const markerStyles = new Style({
      image: new Circle({
        radius: 8,
        fill: new Fill({
          color: 'orange'
        }),
        stroke: new Stroke({
          color: 'black'
        })
      })
    });

    muestras.forEach((muestra: Muestra) => {

      if (muestra.lng && muestra.lat) {
        const markerFeature = new Feature({
          geometry: new Point([muestra.lng, muestra.lat]),
          name: muestra.nombre,
          codigo: muestra.codigo,
          id: muestra.id_muestra
        });
        markerFeature.setStyle(markerStyles);
        markerFeatures.push(markerFeature);
        positions.push({
          name: `${muestra.nombre} ${muestra.codigo}`,
          pos: [muestra.lng, muestra.lat],
          zoom: 11
        })
      }
    });

    //Capa con los features
    const vectorSource = new VectorSource({
      features: markerFeatures,
    });

    const features = new VectorLayer({
      title: 'Features',
      visible: false,
      source: vectorSource,
    } as BaseLayerOptions);

    //Elementos HTML para el popup
    let container = document.getElementById('popup'),
      content_element = document.getElementById('popup-content'),
      closer = document.getElementById('popup-closer');

    //Cerrar el popup
    closer!.onclick = function () {
      overlay.setPosition(undefined);
      closer!.blur();
      return false;
    };

    let overlay = new Overlay({
      element: container!,
      autoPan: true,
      offset: [0, -10]
    });


    // Capas
    // Capa OSM
    const osm = new TileLayer({
      title: 'OSM',
      type: 'base',
      visible: true,
      source: new OSM()
    } as BaseLayerOptions);

    // Capa Bing
    const streetMap = new TileLayer({
      title: 'StreetMap',
      visible: false,
      source: new BingMaps({
        key: 'ApjzTmyuFM7e9XTkQdK-tCIjI1Z4FVnMHd8DzejybZAoxFox0FAkzOK8IbWqmRV_',
        imagerySet: 'AerialWithLabelsOnDemand'
      }),
    } as BaseLayerOptions);

    // Capas Geoserver
    const layerMunicipios = new TileLayer({
      title: 'Municipios',
      visible: false,
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/GeoUIS/wms',
        params: { 'LAYERS': 'GeoUIS:limite_municipal_poligono', 'TILED': true },
        serverType: 'geoserver'
      }),
    } as BaseLayerOptions);

    const layerRiosGrandes = new TileLayer({
      title: 'Rios Grandes',
      visible: false,
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/GeoUIS/wms',
        params: { 'LAYERS': 'GeoUIS:drenaje_doble', 'TILED': true },
        serverType: 'geoserver'
      }),
    } as BaseLayerOptions);

    const layerRios = new TileLayer({
      title: 'Rios',
      visible: false,
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/GeoUIS/wms',
        params: { 'LAYERS': 'GeoUIS:drenaje_sencillo', 'TILED': true },
        serverType: 'geoserver'
      }),
    } as BaseLayerOptions);

    const layerVias = new TileLayer({
      title: 'Vias',
      visible: false,
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/GeoUIS/wms',
        params: { 'LAYERS': 'GeoUIS:via', 'TILED': true },
        serverType: 'geoserver'
      }),
    } as BaseLayerOptions);



    //Grupos de capas
    const baseMaps = new LayerGroup({
      title: 'Base maps',
      layers: [osm]
    } as GroupLayerOptions);

    const capasMaps = new LayerGroup({
      title: 'Capas',
      layers: [streetMap, layerMunicipios, layerRiosGrandes, layerRios, layerVias, features]
    } as GroupLayerOptions);

    //Creamos el mapa
    this.map = new Map({
      view: new View({
        center: [-8292281.51444346, 684409.30384363],
        zoom: 5,
      }),
      layers: [baseMaps, capasMaps],
      target: 'ol-map'
    });


    //Se crea el layerSwitcher
    const layerSwitcher = new LayerSwitcher({
      tipLabel: 'Capas', // Optional label for button
      groupSelectStyle: 'none', // Can be 'children' [default], 'group' or 'none'
      activationMode: 'click',
      startActive: false
    });
    this.map.addControl(layerSwitcher);

    //Función para que cuando se haga click en un punto salga el popup
    this.map.on('click', (evt) => {
      let feature = this.map!.forEachFeatureAtPixel(evt.pixel,
        function (feature: any, layer: any) {
          return feature;
        });
      if (feature) {
        let geometry = feature.getGeometry();
        let coord = geometry.getCoordinates();
        let content = ` <h2 style="margin:0px">Nombre: ${feature.get('name')}</h2>
                        <div>Código: ${feature.get('codigo')}</div>
                        <a class="btn btn-primary btn-sm" href="/muestra/${feature.get('id')}">Ver detalle</a>`;
        content_element!.innerHTML = content;
        overlay.setPosition(coord);
      }
    });


    // The search control
    const search = new Search(
      {	//target: $(".options").get(0),
        // Title to use in the list
        getTitle: function (f: any) { return f.name; },
        // Search result
        autocomplete: function (s: any) {
          var result = [];
          // New search RegExp
          var rex = new RegExp(s.replace("*", "") || "\.*", "i");
          for (var i = 0; i < positions.length; i++) {
            if (rex.test(positions[i].name)) result.push(positions[i]);
          }
          /* Return result directly... */
          return result;
          /* ...or use the callback function
          cback(result);
          return false;
          */
        }
      });
    this.map.addControl(search);

    //Añadimos el popup
    this.map.addOverlay(overlay);

    // Center when click on the reference index
    search.on('select', (e: any) => {
      this.map!.getView().animate({
        center: e.search.pos,
        zoom: 6,
        easing: olEasing.easeOut
      })
    });

  }

}

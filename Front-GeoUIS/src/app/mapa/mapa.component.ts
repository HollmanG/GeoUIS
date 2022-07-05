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
import {Circle, Fill, Stroke, Style} from 'ol/style';
import * as olEasing from 'ol/easing';

//LayerSwitcher
import LayerSwitcher, { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';

//ol-ext
// @ts-ignore
import Search from "ol-ext/control/Search" ; 

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css', 
  '../../../node_modules/ol-ext/dist/ol-ext.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapaComponent implements OnInit {

  public map: Map | undefined;

  ngOnInit(): void {

    //Features
    const markerFeature = new Feature({
      geometry: new Point(fromLonLat([-4.72, 41.66])),
      name: 'Valladolid'
    });
    //Estilos de las features
    const markerStyles = new Style({
      image: new Circle({
        radius: 8,
        fill: new Fill({
          color: 'orange'}),    
        stroke: new Stroke({
          color: 'black'})
      })
    })  
    markerFeature.setStyle(markerStyles);

    //Capa con los features
    const vectorSource = new VectorSource({
      features: [markerFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    //Elementos HTML para el popup
    let container = document.getElementById('popup'),
    content_element = document.getElementById('popup-content'),
    closer = document.getElementById('popup-closer');

    //Cerrar el popup
    closer!.onclick = function() {
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
        params: {'LAYERS': 'GeoUIS:limite_municipal_poligono', 'TILED': true},
        serverType: 'geoserver'
      }),
    } as BaseLayerOptions);

    const layerRiosGrandes = new TileLayer({
      title: 'Rios Grandes',
      visible: false,
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/GeoUIS/wms',
        params: {'LAYERS': 'GeoUIS:drenaje_doble', 'TILED': true},
        serverType: 'geoserver'
      }),
    } as BaseLayerOptions);

    const layerRios = new TileLayer({
      title: 'Rios',
      visible: false,
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/GeoUIS/wms',
        params: {'LAYERS': 'GeoUIS:drenaje_sencillo', 'TILED': true},
        serverType: 'geoserver'
      }),
    } as BaseLayerOptions);

    const layerVias = new TileLayer({
      title: 'Vias',
      visible: false,
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/GeoUIS/wms',
        params: {'LAYERS': 'GeoUIS:via', 'TILED': true},
        serverType: 'geoserver'
      }),
    } as BaseLayerOptions);

    //Grupos de capas
    const baseMaps = new LayerGroup({
      title: 'Base maps', 
      layers: [osm, vectorLayer]
    } as GroupLayerOptions);

    const capasMaps = new LayerGroup({
      title: 'Capas',
      layers: [streetMap,layerMunicipios, layerRiosGrandes, layerRios, layerVias]
    } as GroupLayerOptions);

    //Creamos el mapa
    this.map = new Map({
      view: new View({
        center: [-8292281.51444346,684409.30384363],
        zoom: 5, 
      }),
      layers: [baseMaps, capasMaps],
      target: 'ol-map'
    });

    //Añadimos el popup
    this.map.addOverlay(overlay);

    //Se crea el layerSwitcher
    const layerSwitcher = new LayerSwitcher({
      tipLabel: 'Capas', // Optional label for button
      groupSelectStyle: 'none', // Can be 'children' [default], 'group' or 'none'
      activationMode: 'click',
      startActive: false
    });
    this.map.addControl(layerSwitcher);

    //Función para que cuando se haga click en un punto salga el popup
    this.map.on('click', (evt) =>{
      let feature = this.map!.forEachFeatureAtPixel(evt.pixel,
        function(feature: any, layer: any) {
          return feature;
    });
      if (feature) {
          let geometry = feature.getGeometry();
          let coord = geometry.getCoordinates();
          let content = '<h3>Nombre:' + feature.get('name') + '</h3>';
          content_element!.innerHTML = content;
          overlay.setPosition(coord);
          
          console.info(feature.getProperties());
      }
    });

    // A list of positions to search in
    const positions = 
    [	{ name:"Paris", pos:transform([2.351828, 48.856578], 'EPSG:4326', 'EPSG:3857'), zoom:11 },
      { name:"London", pos:transform([-0.1275,51.507222], 'EPSG:4326', 'EPSG:3857'), zoom:11 },
      { name:"Geneve", pos:transform([6.149985,46.200013], 'EPSG:4326', 'EPSG:3857'), zoom:13 },
      { name:"Bruxelles", pos:transform([4.35,50.83], 'EPSG:4326', 'EPSG:3857'), zoom:12 },
      { name:"Berlin", pos:transform([13.383333,52.516667], 'EPSG:4326', 'EPSG:3857'), zoom:12 },
      { name:"Madrid", pos:transform([-3.683333,40.433333], 'EPSG:4326', 'EPSG:3857'), zoom:12 },
      { name:"Roma", pos:transform([12.48657,41.888732], 'EPSG:4326', 'EPSG:3857'), zoom:12 }
    ]

    // The search control
	  const search = new Search(
		{	//target: $(".options").get(0),
			// Title to use in the list
			getTitle: function(f: any) { return f.name; },
			// Search result
			autocomplete: function (s: any)
			{	var result = [];
				// New search RegExp
				var	rex = new RegExp(s.replace("*","")||"\.*", "i");
				for (var i=0; i<positions.length; i++)
				{	if (rex.test(positions[i].name)) result.push (positions[i]);
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

    // Center when click on the reference index
    search.on('select', (e: any) =>
    {	this.map!.getView().animate({
        center: e.search.pos,
        zoom: 6,
        easing: olEasing.easeOut
      })
    });

  }

}

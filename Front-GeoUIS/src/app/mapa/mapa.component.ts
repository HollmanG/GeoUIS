import { Component, OnInit } from '@angular/core';
import { View, Map, Overlay, Feature } from 'ol';
import LayerSwitcher, { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';
import { Point } from 'ol/geom';
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import {Circle, Fill, Stroke, Style} from 'ol/style';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
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
    const osm = new TileLayer({
      title: 'OSM',
      type: 'base',
      visible: true,
      source: new OSM()
    } as BaseLayerOptions);
    

    //Grupos de capas
    const baseMaps = new LayerGroup({
      title: 'Base maps', 
      layers: [osm, vectorLayer]
    } as GroupLayerOptions);

    //Creamos el mapa
    this.map = new Map({
      view: new View({
        center: [-8292281.51444346,684409.30384363],
        zoom: 5, 
      }),
      layers: [baseMaps],
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

  }

}

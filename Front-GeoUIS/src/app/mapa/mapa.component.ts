import { Component, OnInit } from '@angular/core';
import { View, Map } from 'ol';
import LayerSwitcher, { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  public map: Map | undefined;

  ngOnInit(): void {

    const osm = new TileLayer({
      title: 'OSM',
      type: 'base',
      visible: true,
      source: new OSM()
    } as BaseLayerOptions);

    const baseMaps = new LayerGroup({
      title: 'Base maps', 
      layers: [osm]
    } as GroupLayerOptions);

    this.map = new Map({
      view: new View({
        center: [-8292281.51444346,684409.30384363],
        zoom: 5, 
      }),
      layers: [baseMaps],
      target: 'ol-map'
    });

    const layerSwitcher = new LayerSwitcher({
      tipLabel: 'Capas', // Optional label for button
      groupSelectStyle: 'none', // Can be 'children' [default], 'group' or 'none'
      activationMode: 'click',
      startActive: false
    });
    this.map.addControl(layerSwitcher);

  }

}

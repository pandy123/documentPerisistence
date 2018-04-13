import { ClassUtil } from './decorator/ClassUtil';
import { DataDocument } from './document/DataDocument';
import * as model from './model/index';
import * as document from './document/index';
import { PointNode } from './model/PointNode';
import { WallNode } from './model/WallNode';

var huang = {} as any;
huang.model = model;
huang.document = document;

function app() {
   var document = new DataDocument();
   var p1 = document.createContent(PointNode) as PointNode;
   p1.x = 22;
   p1.y = 36;
   var p2 = document.createContent(PointNode) as PointNode;
   p2.x = 23;
   p2.y = 25;
   var wall = document.createContent(WallNode) as WallNode;
   wall.from = p1;
   wall.to = p2;

   p1.parent = wall;
   p2.parent = wall;

   document.blueprint.addChild(wall);
   wall.parent = document.blueprint;

   wall.addChild(p1);
   wall.addChild(p2);

   var json = document.saveJson();

   var loadDocument = new DataDocument();
   loadDocument.loadJson(json);
   console.log("dd");

}
app();
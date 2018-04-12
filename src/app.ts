import { ClassUtil } from './decorator/ClassUtil';
import { DataDocument } from './document/DataDocument';
import * as model from './model/index';
import * as document from './document/index';

var huang = {} as any;
huang.model = model;
huang.document = document;

function app() {
   var document = new DataDocument();
   console.log("dd");
   var lei = ClassUtil._classes;
}
app();
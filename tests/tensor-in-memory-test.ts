import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';

let model;
async function loadModel() {
  model = await tf.loadLayersModel('file://path/to/your/model.json');
}
loadModel();

import tensorflowjs as tfjs
import tensorflow as tf

one_step_reloaded = tf.saved_model.load('one_step')

tfjs.converters.save_keras_model(one_step_reloaded, 'tfjs_model')

# import tensorflowjs as tfjs
import tensorflow as tf
import time

# Text Generation


model = tf.keras.models.load_model('one_step.h5')
model.compile()
config = model.get_config()
one_step_model = model.from_config(config)


start = time.time()
states = None
next_char = tf.constant(['Use this gospel'])
result = [next_char]

for n in range(1000):
    next_char, states = model.predict(
        next_char)
    result.append(next_char)

result = tf.strings.join(result)
end = time.time()

# tfjs.converters.save_keras_model(one_step_reloaded, 'tfjs_model')

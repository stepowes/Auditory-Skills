# rnn_model.py
from models.base_model import BaseModel
import tensorflow as tf
from tensorflow.keras import layers

class RNNModel(BaseModel):
    def setup_model(self, numFeatures, numSequenceElem, numOutput):
        self.model = tf.keras.Sequential([
            layers.SimpleRNN(64, input_shape=(numFeatures, numSequenceElem)),
            layers.Dense(numOutput, activation='softmax')
        ])
        self.model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

    def train_model(self, data, labels):
        # Assuming data is in the shape (num_samples, 13, 87)
        self.model.fit(data, labels, epochs=10)

    def save_model(self, path):
        self.model.save(path)

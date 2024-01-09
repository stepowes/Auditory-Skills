import abc

class BaseModel(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def setup_model(self):
        pass

    @abc.abstractmethod
    def train_model(self, data, labels):
        pass

    @abc.abstractmethod
    def save_model(self, path):
        pass

    @abc.abstractmethod
    def get_model_info(self):
        pass

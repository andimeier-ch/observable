export { Observable, ObservableList };


const Observable = (value) => {
    const observers = new Set();

    const addObserver = (observer) => {
        observers.add(observer);
    };

    const removeObserver = (observer) => {
        observers.delete(observer);
    };

    const notifyObservers = () => {
        for (const observer of observers) {
            observer.update(value);
        }
    };

    const setValue = (newValue) => {
        if (value === newValue) return;
        value = newValue;
        notifyObservers();
    };

    const getValue = () => value;

    const getObservers = () => observers;


    return { addObserver, removeObserver, setValue, getValue, getObservers };

};



const ObservableList = (list = []) => {

    const addObservers = new Set();
    const removeObservers = new Set();

    const registerAddObserver   = observer => addObservers.add(observer);
    const unregisterAddObserver = observer => addObservers.delete(observer);
    const getAddObservers       = () => addObservers;

    const registerRemoveObserver   = observer => removeObservers.add(observer);
    const unregisterRemoveObserver = observer => removeObservers.delete(observer);
    const getRemoveObservers       = () => removeObservers;

    const getList = () => list;

    const addItem = item => {
        list.push(item);
        notifyAddObservers(item);
    };

    const addItems = (...items) => {
        items.forEach(item => addItem(item));
    };

    const removeItem = item => {
        list.splice(list.indexOf(item), 1);
        notifyRemoveObservers(item);
    };

    const notifyAddObservers = item => {
        addObservers.forEach(observer => observer.update(item));
    };

    const notifyRemoveObservers = item => {
        const safeRemoveObservers = [...removeObservers];
        safeRemoveObservers.forEach(observer => {
            observer.update(item);
        });
    };

    const size = () => list.length;


    return {
        registerAddObserver, unregisterAddObserver, getAddObservers,
        registerRemoveObserver, unregisterRemoveObserver, getRemoveObservers,
        addItem, addItems, removeItem,
        getList, size,
    };

};

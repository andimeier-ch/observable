import { Observable, ObservableList } from "./Observable.js";
import {Observer} from "./Observer.js";


describe('the observable', () => {
    const observable = Observable(0);
    const update1 = jest.fn();
    const observer1 = Observer(update1);

    test('adds an observer', () => {
        expect(observable.getObservers().size).toBe(0);
        observable.addObserver(observer1);
        expect(observable.getObservers().size).toBe(1);
    });

    test('removes an observer', () => {
        expect(observable.getObservers().size).toBe(1);
        observable.removeObserver(observer1);
        expect(observable.getObservers().size).toBe(0);
    });

    test('notifys observers on value change', () => {
        const update2 = jest.fn();
        const observer2 = Observer(update2);
        observable.addObserver(observer1);
        observable.addObserver(observer2);

        observable.setValue(1);
        expect(update1).toBeCalledTimes(1);
        expect(update2).toBeCalledTimes(1);
    });

    test('hides the observerlist property', () => {
        expect(observable.observers).toBe(undefined);
    });
});



describe('the observable list', () => {
    let observableList, onAdd, addObserver, onRemove, removeObserver;

    beforeEach(() => {
        observableList = ObservableList([]);
        onAdd          = jest.fn();
        addObserver    = Observer(onAdd);
        onRemove       = jest.fn();
        removeObserver = Observer(onRemove);
    });

    test('registers an add-observer', () => {
        expect(observableList.getAddObservers().size).toBe(0);
        observableList.registerAddObserver(addObserver);
        expect(observableList.getAddObservers().size).toBe(1);
    });

    test('registers a remove-observer', () => {
        expect(observableList.getRemoveObservers().size).toBe(0);
        observableList.registerRemoveObserver(removeObserver);
        expect(observableList.getRemoveObservers().size).toBe(1);
    });

    test('does not register the same observer more than once', () => {
        expect(observableList.getAddObservers().size).toBe(0);
        observableList.registerAddObserver(addObserver);
        expect(observableList.getAddObservers().size).toBe(1);
        observableList.registerAddObserver(addObserver);
        expect(observableList.getAddObservers().size).toBe(1);

        expect(observableList.getRemoveObservers().size).toBe(0);
        observableList.registerRemoveObserver(removeObserver);
        expect(observableList.getRemoveObservers().size).toBe(1);
        observableList.registerRemoveObserver(removeObserver);
        expect(observableList.getRemoveObservers().size).toBe(1);
    });

    test('unregisters an add-observer', () => {
        expect(observableList.getAddObservers().size).toBe(0);
        observableList.registerAddObserver(addObserver);
        expect(observableList.getAddObservers().size).toBe(1);
        observableList.unregisterAddObserver(addObserver);
        expect(observableList.getAddObservers().size).toBe(0);
    });

    test('unregisters a remove-observer', () => {
        expect(observableList.getRemoveObservers().size).toBe(0);
        observableList.registerRemoveObserver(removeObserver);
        expect(observableList.getRemoveObservers().size).toBe(1);
        observableList.unregisterRemoveObserver(removeObserver);
        expect(observableList.getRemoveObservers().size).toBe(0);
    });

    test('adds an item and notifies observers', ()=> {
        observableList.registerAddObserver(addObserver);

        expect(observableList.getList()).toEqual([]);
        observableList.addItem(1);
        expect(onAdd).toHaveBeenCalledTimes(1);
        expect(observableList.getList()).toEqual([1]);

        observableList.addItems(2, 3);
        expect(onAdd).toHaveBeenCalledTimes(3);
        expect(observableList.getList()).toEqual([1, 2, 3]);
    });

    test('finds and removes an item from the list and notifies observers', () => {
        observableList.registerAddObserver(addObserver);
        observableList.registerRemoveObserver(removeObserver);

        observableList.addItems(4, 5, 6);
        expect(onAdd).toHaveBeenCalledTimes(3);
        expect(observableList.getList()).toEqual([4, 5, 6]);

        observableList.removeItem(5);
        expect(onRemove).toHaveBeenCalledTimes(1);
        expect(observableList.getList()).toEqual([4, 6]);
    });

    test('returns the size of the list of items', () => {
        expect(observableList.size()).toBe(0);
        observableList.addItem(1);
        expect(observableList.size()).toBe(1);
        observableList.addItems(2, 3, 4);
        expect(observableList.size()).toBe(4);
    });
});




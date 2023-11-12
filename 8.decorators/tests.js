describe("Домашнее задание к занятию 8 «Функции декораторы»", () => {
  beforeEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
});
  describe("Задача №1 Усовершенствованный кеширующий декоратор", () => {
    let add2 = (a, b) => a + b;
    let multiply3 = (a, b, c) => a * b * c;
    let upgAdd2;
    let upgMultiply3;


    beforeEach(function(){
      upgAdd2 = cachingDecoratorNew(add2);
      upgMultiply3 = cachingDecoratorNew(multiply3);
    });

    it("Декоратор кеширует", () => {
      expect(upgAdd2(1, 2)).toEqual("Вычисляем: 3");
      expect(upgAdd2(1, 2)).toEqual("Из кеша: 3");
      expect(upgAdd2(1, 2)).toEqual("Из кеша: 3");
    });

    it("Декоратор кеширует функцию 3х аргументов", () => {
      expect(upgMultiply3(2, 2, 3)).toEqual("Вычисляем: 12");
      expect(upgMultiply3(2, 2, 3)).toEqual("Из кеша: 12");
      expect(upgMultiply3(2, 2, 3)).toEqual("Из кеша: 12");
    });

    it("Декоратор кеширует только 5 значений", () => {
      expect(upgMultiply3(2, 2, 4)).toEqual("Вычисляем: 16"); // должно будет удалиться
      expect(upgMultiply3(2, 2, 5)).toEqual("Вычисляем: 20");
      expect(upgMultiply3(2, 2, 6)).toEqual("Вычисляем: 24");
      expect(upgMultiply3(2, 2, 7)).toEqual("Вычисляем: 28");
      expect(upgMultiply3(2, 2, 8)).toEqual("Вычисляем: 32");
      expect(upgMultiply3(2, 2, 8)).toEqual("Из кеша: 32");
      expect(upgMultiply3(2, 2, 3)).toEqual("Вычисляем: 12");
      expect(upgMultiply3(2, 2, 4)).toEqual("Вычисляем: 16"); // должно заново вычисляться
    });
  });

  describe("Задача №2 Усовершенствованный декоратор отложенного вызова", () => {
    
    it("Декоратор выполняет первый синхронный вызов функции", () => {
      let hasCalled = false;
      const functionToDecorate = () => {
        console.log("тук тук");
        hasCalled = !hasCalled;
      }
      const decoratedFunction = debounceDecoratorNew(functionToDecorate, 100);
      decoratedFunction(1, 2, 3);
      expect(hasCalled).toBe(true);
    });

    it("Декоратор выполнит второй вызов асинхронно функции", (done) => {
      let hasCalled = false;
      const functionToDecorate = () => {
        console.log("тук тук");
        hasCalled = !hasCalled;
      }
      const decoratedFunction = debounceDecoratorNew(functionToDecorate, 100);
      decoratedFunction(1, 2, 3);
      expect(hasCalled).toBe(true);

      decoratedFunction(1, 2, 3);
      expect(hasCalled).toBe(true);

      setTimeout(() => {
        decoratedFunction(1, 2, 3);
        expect(hasCalled).toBe(false);
        done();
      }, 150);
    });

    it("Декоратор считает общее количество вызовов функции", () => {
      const functionToDecorate = () => console.log("тук тук");
      const decoratedFunction = debounceDecoratorNew(functionToDecorate, 100);
      expect(decoratedFunction.allCount).toBe(0);
      decoratedFunction(1, 2, 3);
      expect(decoratedFunction.allCount).toBe(1);

      decoratedFunction(1, 2, 3);
      expect(decoratedFunction.allCount).toBe(2);
    });

    it("Декоратор считает количество вызовов переданной функции", (done) => {
      const functionToDecorate = () => console.log("тук тук");
      const decoratedFunction = debounceDecoratorNew(functionToDecorate, 100);
      expect(decoratedFunction.count).toBe(0);
      decoratedFunction(1, 2, 3);
      expect(decoratedFunction.count).toBe(1);
  
      decoratedFunction(1, 2, 3);
      expect(decoratedFunction.count).toBe(1);
  
      setTimeout(() => {
        decoratedFunction(1, 2, 3);
        expect(decoratedFunction.count).toBe(2);
      }, 150);

      setTimeout(() => {
        decoratedFunction(1, 2, 3);
        expect(decoratedFunction.count).toBe(2);
      }, 200);

      setTimeout(() => {
        decoratedFunction(1, 2, 3);
        expect(decoratedFunction.count).toBe(3);
        expect(decoratedFunction.allCount).toBe(5);
        done();
      }, 400);
    });

    it("Тест асинхронного вызова из примера к домашнему заданию", (done) => {
      
      const sendSignal = (signalOrder, delay) => console.log("Сигнал отправлен", signalOrder, delay);
      const upgradedSendSignal = debounceDecoratorNew(sendSignal, 2000);
    setTimeout(() => {
      upgradedSendSignal(1, 0); // Сигнал отправлен + будет запланирован асинхронный запуск, который будет проигнорирован, так как следующий сигнал отменит предыдущий (300 - 0 < 2000)
      expect(upgradedSendSignal.count).toBe(1);
    }, 0);
    
    setTimeout(() => {
      upgradedSendSignal(2, 300);
      expect(upgradedSendSignal.count).toBe(1);
    }, 300); // проигнорировано, так как следующий сигнал отменит предыдущий (900 - 300 < 2000)
    
    setTimeout(() => {
      upgradedSendSignal(3, 900);
      expect(upgradedSendSignal.count).toBe(1);
    }, 900); // проигнорировано, так как следующий сигнал отменит предыдущий (1200 - 900 < 2000)
    
    setTimeout(() => {
      upgradedSendSignal(4, 1200);
      expect(upgradedSendSignal.count).toBe(1);
    }, 1200); // проигнорировано, так как следующий сигнал отменит предыдущий (2300 - 1200 < 2000)
    
    setTimeout(() => {
      upgradedSendSignal(5, 2300);
      expect(upgradedSendSignal.count).toBe(2);
    }, 2300); // Сигнал отправлен, так как следующий вызов не успеет отменить текущий: 4400-2300=2100 (2100 > 2000)
    
    setTimeout(() => {
      upgradedSendSignal(6, 4400);
      expect(upgradedSendSignal.count).toBe(3);
    }, 4400); // проигнорировано, так как следующий сигнал отменит предыдущий (4500 - 4400 < 2000)
    
    setTimeout(() => {
      upgradedSendSignal(7, 4500);
      expect(upgradedSendSignal.count).toBe(3);
    }, 4500); // Сигнал будет отправлен, так как последний вызов debounce декоратора (спустя 4500 + 2000 = 6500) 6,5с
    
    setTimeout(() => {
      expect(upgradedSendSignal.count).toBe(3); // было выполнено 3 отправки сигнала
      expect(upgradedSendSignal.allCount).toBe(7); // было выполнено 6 вызовов декорированной функции
      done();
    }, 7000)
    
    });
  });
});


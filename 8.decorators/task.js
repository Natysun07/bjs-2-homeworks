function cachingDecoratorNew(func) {
  const cache = [];
  const cacheSize = 5;

  function getHash(args) {
    return md5(JSON.stringify(args));
  }

  return function (...args) {
    const hash = getHash(args);
    const cachedItem = cache.find(item => item.hash === hash);

    if (cachedItem) {
      console.log("Из кеша: " + cachedItem.result);
      return "Из кеша: " + cachedItem.result;
    }

    const result = func(...args);

    if (cache.length >= cacheSize) {
      cache.shift(); // Удаляем старый элемент из кеша
    }

    cache.push({ hash, result });

    console.log("Вычисляем: " + result);
    return "Вычисляем: " + result;
  };
}

//Задача № 2

function debounceDecoratorNew(func, delay) {
  let timeoutId;

  function wrapper(...args) {
    wrapper.allCount++;
    if (!timeoutId) {
      func(...args);
      wrapper.count++;
      timeoutId = setTimeout(() => {
        timeoutId = null;
        if (wrapper.allCount != wrapper.count)
        {

        }
      }, delay);
    }
  }

  wrapper.count = 0;
  wrapper.allCount = 0;

  return wrapper;
} 

(() => {
  const DAILY_LIMIT = 12;

  let getTodayRandom = (id) => {
    let now = new Date();
    id = [id, now.getFullYear(), now.getMonth(), now.getDate(), now.getDay()].join(':');
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = (hash * 37 + id.charCodeAt(i)) & 0xFFFFFFFF;
    }
    let next = hash;
    let shortRand = () => {
      next = (next * 1103515245 + 12345) & 0xFFFFFFFF;
      return (next >> 16) & 0xFFFF;
    };

    return () => {
      let a = shortRand();
      let b = shortRand();
      let c = (a << 16) | b;
      return (1.0 + c / (0x100000000)) % 1;
    };
  };

  let sets = null;
  let activeSet = null;
  let activeCards = null;
  let activeSide = null;
  let activeIndex = 0;
  let isFlipped = false;
  let ui = null;

  let onBack = () => {
    activeIndex = (activeIndex - 1 + activeCards.length) % activeCards.length;
    isFlipped = false;
    reloadDisplay();
  };
  let onFlip = () => {
    isFlipped = !isFlipped;
    reloadDisplay();
  };
  let onNext = () => {
    activeIndex = (activeIndex + 1) % activeCards.length;
    isFlipped = false;
    reloadDisplay();
  };

  let shuffleList = (arr, nextRnd) => {

    for (let i = 0; i < arr.length; i++) {
      let swapIndex = Math.floor(nextRnd() * arr.length);
      let t = arr[i];
      arr[i] = arr[swapIndex];
      arr[swapIndex] = t;
    }
  };

  let onRandomize = () => {
    let getRnd = getTodayRandom(activeSet);
    let cards = [...activeSet.words];
    shuffleList(cards, getRnd);
    activeCards = [];
    for (let i = 0; i < DAILY_LIMIT; i++) {
      activeCards.push(cards[i]);
    }
    shuffleList(activeCards, () => Math.random());
    isFlipped = false;
    reloadDisplay()
  };
  let onChooseSet = (setId) => {
    activeSet = sets.filter(s => s.id === setId)[0];
    index = 0;
    onRandomize();
  };
  let onChooseSide = (side) => {
    activeSide = side;
    isFlipped = false;
    reloadDisplay();
  };

  window.addEventListener('load', () => {
    sets = getWordBank();
    activeIndex = 0;
    activeSet = sets[0].id;
    activeSide = 'EN';

    let get = id => document.getElementById(id);
    
    ui = {
      setPicker: get('set-picker'),
      sidePicker: get('side-picker'),
      display: {
        overall: get('card-display'),
        main: get('display-main'),
        secondary: get('display-secondary'),
      },
      buttons: {
        back: get('button-back'),
        // flip: get('button-flip'),
        next: get('button-next'),
        randomize: get('button-randomize'),
      },
    };

    ui.setPicker.addEventListener('change', () => onChooseSet(ui.setPicker.value));
    ui.sidePicker.addEventListener('change', () => onChooseSide(ui.sidePicker.value));
    ui.buttons.back.addEventListener('click', () => onBack());
    //ui.buttons.flip
    ui.display.overall.addEventListener('click', () => onFlip());
    ui.buttons.next.addEventListener('click', () => onNext());
    ui.buttons.randomize.addEventListener('click', () => onRandomize());

    sets.forEach(set => {
      let opt = document.createElement('option');
      opt.value = set.id;
      opt.innerText = set.name;
      ui.setPicker.append(opt);
    });

    initialize();
  });

  let initialize = () => {
    activeSet = sets.filter(set => set.id === ui.setPicker.value)[0];
    activeSide = Array.from(ui.sidePicker.children).filter(o => o.value)[0].value;
    onRandomize();
    
  };

  let reloadDisplay = () => {
    let card = activeCards[activeIndex];
    let primary = '';
    let secondary = '';
    if (!isFlipped) {
      primary = card[activeSide];
      secondary = '';
    } else if (activeSide === 'EN') {
      primary = card.KJ;
      secondary = card.KA;
    } else if (activeSide === 'KA') {
      primary = card.EN;
      secondary = card.KJ;
    } else if (activeSide === 'KJ') {
      primary = card.EN;
      secondary = card.KA;
    } else if (activeSide === 'RO') {
      primary = card.EN;
      seondary = card.KJ + ' (' + card.KA + ')';
    } else {
      throw new Error();
    }
    ui.display.main.innerText = primary;
    ui.display.secondary.innerText = secondary;
  };

})();

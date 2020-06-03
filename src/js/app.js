import '../scss/main.scss';

// show navList
const navBtn = document.querySelector('.nav-hamburger');
const navList = document.querySelector('.nav-list');
navBtn.addEventListener('click', () => {
  navList.classList.toggle('show');
  navBtn.classList.toggle('show');
  const navLink = navList.querySelectorAll('.nav-link');
  navLink.forEach((item) => {
    item.addEventListener('click', () => {
      navList.classList.remove('show');
      navBtn.classList.remove('show');
    });
  });
});

// nav-sticky
const navBar = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  navBar.classList.toggle('sticky', window.scrollY > 0);
});

// nav-search
const openSearch = document.getElementById('search-open'),
  closeSearch = document.getElementById('close-search'),
  searchFull = document.querySelector('.search-full');

openSearch.addEventListener('click', () => {
  searchFull.classList.add('show');
});
closeSearch.addEventListener('click', () => {
  searchFull.classList.remove('show');
});

// home parallax
// const home = document.getElementById('home');
// window.addEventListener('scroll', () => {
//   home.style.top = window.scrollY * 0.25 + 'px';
// });

// cus-slider
const cardCus = document.querySelectorAll('.card-customer'),
  prevCus = document.querySelector('#prev-cus'),
  nextCus = document.querySelector('#next-cus');

let index = 0;

const slideCus = (n) => {
  if (n > cardCus.length - 1) {
    index = 0;
  }
  if (n < 0) {
    index = cardCus.length - 1;
  }

  cardCus.forEach((item) => {
    item.classList.remove('show');
  });
  cardCus[index].classList.add('show');
};

nextCus.addEventListener('click', () => {
  slideCus((index += 1));
});
prevCus.addEventListener('click', () => {
  slideCus((index += -1));
});

// observer

const moveIn = document.querySelectorAll('.move-in'),
  moveUp = document.querySelectorAll('.move-up'),
  moveOut = document.querySelectorAll('.move-out'),
  fadeIn = document.querySelectorAll('.fade-in'),
  fadeOut = document.querySelectorAll('.fade-out'),
  fade = document.querySelectorAll('.fade'),
  moveDown = document.querySelectorAll('.move-down');

const options = {
  // rootMargin: '200px 0px 0px 0px',
  threshold: 0.3,
};

const moveObserve = new IntersectionObserver((entries, moveObserve) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('show');
      moveObserve.unobserve(entry.target);
    }
  });
}, options);

moveIn.forEach((item) => {
  moveObserve.observe(item);
});

moveOut.forEach((item) => {
  moveObserve.observe(item);
});

moveUp.forEach((item) => {
  moveObserve.observe(item);
});

fadeIn.forEach((item) => {
  moveObserve.observe(item);
});

fadeOut.forEach((item) => {
  moveObserve.observe(item);
});

fade.forEach((item) => {
  moveObserve.observe(item);
});

moveDown.forEach((item) => {
  moveObserve.observe(item);
});

//
const sectionNav = document.querySelectorAll('section');
const navOptions = {
  // rootMargin: '-200px 0px 0px 0px',
  threshold: 0.6,
};

const navObserve = new IntersectionObserver((entries, navObserve) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      const navLink = document.querySelectorAll('.nav-link');
      navLink.forEach((item) => {
        item.classList.remove('active');
        if (
          item.getAttribute('href') === `#${entry.target.getAttribute('id')}`
        ) {
          item.classList.add('active');
        }
      });
    }
  });
}, navOptions);

sectionNav.forEach((item) => {
  navObserve.observe(item);
});

// back-to-top

const backTop = document.querySelector('.back-to-top');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  backTop.classList.remove('active');
  const scrollTop = document.documentElement.scrollTop;
  if (scrollTop > 0) {
    if (scrollTop > lastScroll) {
      backTop.classList.remove('active');
    } else {
      backTop.classList.add('active');
    }
    lastScroll = scrollTop;

    backTop.addEventListener('click', () => {
      document.documentElement.scrollTop = 0;
    });
  }
});

// reser option
const timeOption = document.getElementById('time'),
  personOption = document.getElementById('person'),
  listTime = document.getElementById('list-time'),
  listPerson = document.getElementById('list-person'),
  card = document.querySelector('.reser-card');

let timeStart = 9;
const timeData = ['Time'];
const personData = ['Persons'];
// create time
for (let i = 0; i < 24; i++) {
  const a = Math.floor(timeStart);
  const b = Math.ceil(timeStart);
  const y = b - timeStart;
  let x;
  a < 10 ? (a = `0${a}`) : a;
  y === 0 ? (x = `${a}:00`) : (x = `${a}:${(b - timeStart) * 60}`);
  timeData.push(x);
  timeStart += 0.5;
}
// create person
for (let j = 1; j < 15; j++) {
  personData.push(j);
}

// add option to dom
const addOptions = (value, target) => {
  value.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('list-opt__item');
    li.innerText = `${item}`;
    target.appendChild(li);
  });
};

// show data
const showValue = (option, list, listRemove) => {
  option.addEventListener('click', () => {
    listRemove.classList.remove('show');
    list.classList.toggle('show');
    list.addEventListener('click', (e) => {
      option.innerText = e.target.innerText;
      list.classList.remove('show');
    });
  });
};

card.addEventListener('click', (e) => {
  if (!e.target.classList.contains('opt')) {
    listTime.classList.remove('show');
    listPerson.classList.remove('show');
  }
});

addOptions(timeData, listTime);
addOptions(personData, listPerson);
showValue(timeOption, listTime, listPerson);
showValue(personOption, listPerson, listTime);

// form-submit
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const formSub = document.getElementById('form');

const showError = (input, mes) => {
  const formControl = input.parentElement,
    span = formControl.querySelector('span');
  formControl.classList.add('error');
  span.innerHTML = mes;
  setTimeout(() => {
    formControl.classList.remove('error');
  }, 3000);
};

const showSuccess = (input) => {
  input.parentElement.classList.remove('error');
};

const checkEmail = (input) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
};

const checkPhone = (input) => {
  const re = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, `Phone number is not valid`);
  }
};

formSub.addEventListener('submit', (e) => {
  e.preventDefault();
  checkEmail(email);
  checkPhone(phone);
});

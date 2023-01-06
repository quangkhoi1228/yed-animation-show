

var main = {
  logoDrawContainer: '',
  textTypingEffectInitDelay: 8000,
  awardsVideoDelay: 15000,
  openLetterDelay: 15000,
  secondTextTypingEffectInitDelay: 8000,
  happyNewYearDelay: 18000,
  isTypingTextFadeout: false,
  aclAndMftAudio: '',
  typingAudio: '',
  countdownAudio: '',
  ncsAudio: '',

  init() {


    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 300)
    main.introButtonInit();

    main.audioInit();


    // var container = document.querySelector('.intro-section');

    // container.style.display = 'none'; document.querySelector('.main').classList.add('start');
    // main.logoDrawInit();
    // // setTimeout(() => {
    // //   main.openLetterInit();
    // // }, 3000)
  },

  pauseAudio(audio) {
    let interval = setInterval(() => {
      if (audio.volume <= 0) {
        audio.pause();
        clearInterval(interval);
      }
      if (audio.volume >= 0.1) { audio.volume -= 0.1; }
    }, 100);

    // setTimeout(() => audio.pause(), 3000)
  },

  playAudio(audio) {

    if (audio == main.aclAndMftAudio) {
      main.aclAndMftAudio.pause()

      main.aclAndMftAudio.currentTime = 0;
      main.aclAndMftAudio.volume = 0.5;
      main.aclAndMftAudio.play()
    }

    if (audio == main.typingAudio) {
      main.typingAudio.pause()
      main.typingAudio.currentTime = 0;
      main.typingAudio.volume = 1;
      main.typingAudio.play()
    }

    if (audio == main.countdownAudio) {
      main.countdownAudio.pause()

      main.countdownAudio.currentTime = 0;
      main.countdownAudio.volume = 1;
      main.countdownAudio.play()
    }

    if (audio == main.ncsAudio) {
      main.ncsAudio.pause()
      main.ncsAudio.currentTime = 0;
      main.ncsAudio.volume = 0.2;
      main.ncsAudio.play()
    }



    // let max = 1;

    // // if (audio == main.aclAndMftAudio || audio == main.ncsAudio) {
    // //   max = 0.5;
    // // }
    // audio.volume = 0;
    // console.log(audio);
    // let interval = setInterval(() => {
    //   if (audio.volume >= max) {
    //     console.log(audio.volume);
    //     audio.play();
    //     clearInterval(interval);
    //   }
    //   if (audio.volume <= (max - 0.1)) { audio.volume += 0.1; }
    // }, 100);

    // setTimeout(() => audio.pause(), 3000)
  },

  audioInit() {
    main.aclAndMftAudio = new Audio('/assets/files/aclandmft.mp3');
    main.typingAudio = new Audio('/assets/files/typing-audio.mp3');
    main.countdownAudio = new Audio('/assets/files/countdown.mp3');
    main.ncsAudio = new Audio('/assets/files/ncs.mp3');
    main.ncsAudio.volume = 0.5;
  },

  introButtonInit() {
    var container = document.querySelector('.intro-section');
    var button = document.querySelector('.intro-section button');
    button.onclick = () => { container.style.display = 'none'; document.querySelector('.main').classList.add('start'); main.logoDrawInit(); }

  },

  logoDrawInit() {

    var container = document.querySelector('#aclAndMftContainer');
    container.classList.add('aclandmft-container');

    setTimeout(() => {
      window.scrollTo(0, 0);
      // main.aclAndMftAudio.play();
      main.playAudio(main.aclAndMftAudio);

    }, 300)
    setTimeout(() => {
      main.textTypingEffectInit();
      main.pauseAudio(main.aclAndMftAudio);
    }, main.textTypingEffectInitDelay)
  },

  textTypingEffectInit() {

    // main.typingAudio.play();
    // main.playAudio(main.typingAudio);

    var container = document.querySelector('.effect-typing-text-container');
    container.scrollIntoView();
    const lengths = [26, 27, 32, 16];

    // window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period, function () {

          // backgroundFirework();
          backgroundFireworkNew();
          // main.pauseAudio(main.typingAudio);


          main.countdownInit();
        }, lengths, main.typingAudio);

      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
    // };

  },

  countdownInit() {

    // main.countdownAudio.play();
    main.playAudio(main.countdownAudio);


    let container = document.querySelector('#countdownIframe');
    // container.classList.add('is-active');
    container.setAttribute('src', '/pages/countdown.html');
    container.scrollIntoView();

    setTimeout(() => {
      main.awardsVideoInit();
      main.pauseAudio(main.countdownAudio);

      // main.countdownAudio.pause();
    }, main.awardsVideoDelay)

  },

  awardsVideoInit() {

    let container = document.querySelector('.awards-video-container');
    let video = document.getElementById('awardsVideo');
    let duration = video.duration * 1000 + 2000;
    setTimeout(() => {
      stopBackgroundFirework();
      container.scrollIntoView();
      video.play();
      setTimeout(() => main.updateYearInit(), duration)
    }, 2000);

  },
  updateYearInit() {
    // main.ncsAudio.play()
    main.playAudio(main.ncsAudio);

    backgroundFireworkNew();
    let container = document.querySelector('.update-year-section');
    let iframe = document.querySelector('#updateYearIframe');
    let iframeContent = iframe.contentWindow.document;
    iframeContent.querySelector('.update-year-container').classList.add('is-active');
    container.scrollIntoView();

    setTimeout(() => {
      main.openLetterInit();
    }, main.openLetterDelay)

  },
  openLetterInit() {

    stopBackgroundFirework();


    var container = document.querySelector(".letter-container");
    container.scrollIntoView();
    let cursor = container.querySelector('.cursor-container');
    let letterVideoContainer = container.querySelector('.letter-video-container');
    let letterVideo = letterVideoContainer.querySelector('#letterVideo');
    let duration = letterVideo.duration * 1000 + 2000;

    setTimeout(() => {
      cursor.classList.add("is-active");

      setTimeout(() => {
        // main.ncsAudio.pause();

        main.pauseAudio(main.ncsAudio);

        letterVideoContainer.classList.add('is-active');
        letterVideo.play();

        setTimeout(() => {
          letterVideoContainer.classList.remove('is-active');
          main.secondTypingTextInit();
        }, duration)
      }, 4000)

    }, 1000);

  },
  secondTypingTextInit() {
    // main.playAudio(main.typingAudio);
    // main.typingAudio.play()
    var container = document.querySelector('.effect-typing-text-container.second');
    container.scrollIntoView();
    var element = document.querySelector('.typewrite1');

    var toRotate = element.getAttribute('data-type');
    var period = element.getAttribute('data-period');
    if (toRotate) {
      new TxtType(element, JSON.parse(toRotate), period, function () {
        main.happyNewYearInit();
        // main.typingAudio.pause();
        // main.pauseAudio(main.typingAudio);

      }, [29], main.typingAudio);

    }

    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite1 > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
    // };

    // setTimeout(() => main.happyNewYearInit(), main.secondTextTypingEffectInitDelay)

  },
  happyNewYearInit() {
    // main.ncsAudio.play();
    main.playAudio(main.ncsAudio);

    var container = document.querySelector('.happy-new-year-container');
    document.querySelector('#happyNewYearIframe').src = '/pages/happynewyear.html';
    container.scrollIntoView()
    // setTimeout(() => container.scrollIntoView(), 2000);

    setTimeout(() => main.funInit(), main.happyNewYearDelay);
  },

  funInit() {
    console.log('1123123');
    backgroundFireworkNew();
    var container = document.querySelector('.fun-container');
    setTimeout(() => {
      container.scrollIntoView(); container.classList.add('is-active');

      setTimeout(() => {
        main.jerryInit();
      }, 2000);
    }, 4000);

  },

  jerryInit() {
    stopBackgroundFirework();
    var container = document.querySelector('#jerryContainer');
    container.scrollIntoView();
    var video = document.getElementById('jerryVideo');
    video.play();
  }
};

function stopBackgroundFirework() {

  const canvas = document.getElementById("canvasBackgroundFirework");
  canvas.style.display = 'none';
}

function backgroundFireworkNew() {

  const canvas = document.getElementById("canvasBackgroundFirework");
  canvas.style.display = 'block';

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");
  function Firework(x, y, height, yVol, R, G, B) {
    this.x = x;
    this.y = y;
    this.yVol = yVol;
    this.height = height;
    this.R = R;
    this.G = G;
    this.B = B;
    this.radius = 2;
    this.boom = false;
    var boomHeight = Math.floor(Math.random() * 200) + 50;
    this.draw = function () {

      ctx.fillStyle = "rgba(" + R + "," + G + "," + B + ")";
      ctx.strokeStyle = "rgba(" + R + "," + G + "," + B + ")";
      ctx.beginPath();
      //   ctx.arc(this.x,boomHeight,this.radius,Math.PI * 2,0,false);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, Math.PI * 2, 0, false);
      ctx.fill();
    }
    this.update = function () {
      this.y -= this.yVol;
      if (this.radius < 20) {
        this.radius += 0.35;
      }
      if (this.y < boomHeight) {
        this.boom = true;

        for (var i = 0; i < 120; i++) {
          particleArray.push(new Particle(
            this.x,
            this.y,
            // (Math.random() * 2) + 0.5//
            (Math.random() * 2) + 1,
            this.R,
            this.G,
            this.B,
            1,
          ))

        }
      }
      this.draw();
    }
    this.update()
  }

  window.addEventListener("click", (e) => {
    var x = e.clientX;
    var y = canvas.height;
    var R = Math.floor(Math.random() * 255)
    var G = Math.floor(Math.random() * 255)
    var B = Math.floor(Math.random() * 255)
    var height = (Math.floor(Math.random() * 20)) + 10;
    fireworkArray.push(new Firework(x, y, height, 5, R, G, B))
  })

  function Particle(x, y, radius, R, G, B, A) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.R = R;
    this.G = G;
    this.B = B;
    this.A = A;
    this.timer = 0;
    this.fade = false;

    // Change random spread
    this.xVol = (Math.random() * 10) - 4
    this.yVol = (Math.random() * 10) - 4


    this.draw = function () {
      //   ctx.globalCompositeOperation = "lighter"
      ctx.fillStyle = "rgba(" + R + "," + G + "," + B + "," + this.A + ")";
      ctx.save();
      ctx.beginPath();
      // ctx.fillStyle = "white"
      ctx.globalCompositeOperation = "screen"
      ctx.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false);
      ctx.fill();

      ctx.restore();
    }
    this.update = function () {
      this.x += this.xVol;
      this.y += this.yVol;

      // Comment out to stop gravity. 
      if (this.timer < 200) {
        this.yVol += 0.12;
      }
      this.A -= 0.02;
      if (this.A < 0) {
        this.fade = true;
      }
      this.draw();
    }
    this.update();
  }

  var fireworkArray = [];
  var particleArray = [];
  for (var i = 0; i < 6; i++) {
    var x = Math.random() * canvas.width;
    var y = canvas.height;
    var R = Math.floor(Math.random() * 255)
    var G = Math.floor(Math.random() * 255)
    var B = Math.floor(Math.random() * 255)
    var height = (Math.floor(Math.random() * 20)) + 10;
    fireworkArray.push(new Firework(x, y, height, 5, R, G, B))
  }


  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "rgba(0,0,0,0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < fireworkArray.length; i++) {
      fireworkArray[i].update();
    }
    for (var j = 0; j < particleArray.length; j++) {
      particleArray[j].update();
    }
    if (fireworkArray.length < 4) {
      var x = Math.random() * canvas.width;
      var y = canvas.height;
      var height = Math.floor(Math.random() * 20);
      var yVol = 5;
      var R = Math.floor(Math.random() * 255);
      var G = Math.floor(Math.random() * 255);
      var B = Math.floor(Math.random() * 255);
      fireworkArray.push(new Firework(x, y, height, yVol, R, G, B));
    }


    fireworkArray = fireworkArray.filter(obj => !obj.boom);
    particleArray = particleArray.filter(obj => !obj.fade);
  }
  animate();

  window.addEventListener("resize", (e) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  })
}

function backgroundFirework() {




  /********************
      Animation Frame
    ********************/

  window.requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  /********************
      Vars
    ********************/
  var canvas = document.getElementById("canvasBackgroundFirework"),
    ctx = canvas.getContext("2d"),
    cw = window.innerWidth,
    ch = window.innerHeight,
    fireworks = [],
    particles = [],
    hue = 120, // starting hue
    limiterTotal = 5, // limit 5 when click trigger
    limiterTick = 0, // launch timer
    timerTotal = 80,
    timerTick = 0,
    mousedown = false,
    mx, // mouse x coordinate,
    my; // mouse y coordinate

  // set canvas dimensions
  canvas.width = cw;
  canvas.height = ch;

  /********************
      Helper Functions
    ********************/

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function calculateDistance(p1x, p1y, p2x, p2y) {
    var xDistance = p1x - p2x,
      yDistance = p1y - p2y;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  }

  /********************
      Fireworks
    ********************/
  function Firework(sx, sy, tx, ty) {
    // actual coordinates
    this.x = sx;
    this.y = sy;
    // starting coordinates
    this.sx = sx;
    this.sy = sy;
    // target coordinates
    this.tx = tx;
    this.ty = ty;
    // distance from starting point to target
    this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
    this.distanceTraveled = 0;
    // track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
    this.coordinates = [];
    this.coordinateCount = 3;
    // populate initial coordinate collection with the current coordinates
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
    this.angle = Math.atan2(ty - sy, tx - sx);
    this.speed = 2;
    this.acceleration = 1.05;
    this.brightness = random(50, 70);
    // circle target indicator radius
    this.targetRadius = 2;
  }

  // update firework
  Firework.prototype.update = function (index) {
    // remove last item in coordinates array
    this.coordinates.pop();
    // add current coordinates to the start of the array
    this.coordinates.unshift([this.x, this.y]);
    // cycle the circle target indicator radius
    if (this.targetRadius < 8) {
      this.targetRadius += 0.3;
    } else {
      this.targetRadius = 1;
    }
    // speed up the firework
    this.speed *= this.acceleration;
    // get the current velocities based on angle and speed
    var vx = Math.cos(this.angle) * this.speed,
      vy = Math.sin(this.angle) * this.speed;
    // how far will the firework have traveled with velocities applied?
    this.distanceTraveled = calculateDistance(
      this.sx,
      this.sy,
      this.x + vx,
      this.y + vy
    );
    // if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
    if (this.distanceTraveled >= this.distanceToTarget) {
      createParticles(this.tx, this.ty);
      fireworks.splice(index, 1); // remove the firework, use the index passed into the update function to determine which to remove
    } else {
      // target not reached, keep traveling
      this.x += vx;
      this.y += vy;
    }
  };

  // draw firework
  Firework.prototype.draw = function () {
    ctx.beginPath();
    ctx.moveTo(
      this.coordinates[this.coordinates.length - 1][0],
      this.coordinates[this.coordinates.length - 1][1]
    ); // move to the last tracked coordinate in the set, then draw a line to the current x and y
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = "hsl(" + hue + ", 100%, " + this.brightness + "%)";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2); // draw the target for this firework with a pulsing circle
    ctx.stroke();
  };

  /********************
      Particle Prototype
    ********************/

  function Particle(x, y) {
    this.x = x;
    this.y = y;
    // track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
    this.coordinates = [];
    this.coordinateCount = 5;
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
    // set a random angle in all possible directions, in radians
    this.angle = random(0, Math.PI * 2);
    this.speed = random(1, 10);
    // friction will slow the particle down
    this.friction = 0.95;
    // gravity will be applied and pull the particle down
    this.gravity = 1;
    // set the hue to a random number +-50 of the overall hue variable
    this.hue = random(hue - 50, hue + 50);
    this.brightness = random(50, 80);
    this.alpha = 1;
    // set how fast the particle fades out
    this.decay = random(0.015, 0.03);
  }

  Particle.prototype.update = function (index) {
    // remove last item in coordinates array
    this.coordinates.pop();
    // add current coordinates to the start of the array
    this.coordinates.unshift([this.x, this.y]);
    // slow down the particle
    this.speed *= this.friction;
    // apply velocity
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;
    // fade out the particle
    this.alpha -= this.decay;

    // remove the particle once the alpha is low enough, based on the passed in index
    if (this.alpha <= this.decay) {
      particles.splice(index, 1);
    }
  };

  // draw particle
  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.moveTo(
      this.coordinates[this.coordinates.length - 1][0],
      this.coordinates[this.coordinates.length - 1][1]
    ); // move to the last tracked coordinates in the set, then draw a line to the current x and y
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle =
      "hsla(" + this.hue + ", 100%, " + this.brightness + "%, " + this.alpha + ")";
    ctx.stroke();
  };

  // create particle group & explosion
  function createParticles(x, y) {
    var particleCount = 30; // increase the particle count for a bigger explosion
    while (particleCount--) {
      particles.push(new Particle(x, y));
    }
  }

  /********************
      Update
    ********************/

  function update() {
    requestAnimFrame(update);

    // increase the hue to get different colored fireworks over time
    //hue += 0.5;

    // create random color
    hue = random(0, 360);

    // clearRect() with opacity
    ctx.globalCompositeOperation = "destination-out";
    // decrease the alpha property to create more prominent trails
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, cw, ch);
    // change the composite operation back to our main mode
    // lighter creates bright highlight points as the fireworks and particles overlap each other
    ctx.globalCompositeOperation = "lighter";

    // loop over each firework, draw it, update it
    var i = fireworks.length;
    while (i--) {
      fireworks[i].draw();
      fireworks[i].update(i);
    }

    // loop over each particle, draw it, update it
    var i = particles.length;
    while (i--) {
      particles[i].draw();
      particles[i].update(i);
    }

    // launch fireworks automatically to random coordinates, when the mouse isn't down
    if (timerTick >= timerTotal) {
      if (!mousedown) {
        // start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
        fireworks.push(new Firework(cw / 2, ch, random(0, cw), random(0, ch / 2)));
        timerTick = 0;
      }
    } else {
      timerTick++;
    }

    // limit the rate at which fireworks get launched when mouse is down
    if (limiterTick >= limiterTotal) {
      if (mousedown) {
        // start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
        fireworks.push(new Firework(cw / 2, ch, mx, my));
        limiterTick = 0;
      }
    } else {
      limiterTick++;
    }
  }

  function onResize() {
    cw = window.innerWidth;
    ch = window.innerHeight;
    canvas.width = cw;
    canvas.height = ch;
  }

  /********************
      Event Listeners
    ********************/

  canvas.addEventListener("mousemove", function (e) {
    mx = e.pageX - canvas.offsetLeft;
    my = e.pageY - canvas.offsetTop;
  });

  canvas.addEventListener("mousedown", function (e) {
    e.preventDefault();
    mousedown = true;
  });

  canvas.addEventListener("mouseup", function (e) {
    e.preventDefault();
    mousedown = false;
  });

  window.addEventListener("resize", onResize);

  // window.onload = update;
  update();
}


function countdown() {

  let bg = document.querySelector(".animation-bg");
  let i, dot;
  const submit = document.querySelector(".send-stars");
  const icon = document.querySelector(".icon");

  function createStar() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 512.001 512.001");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("class", "star");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    let d = `M511.266,197.258c-1.764-5.432-6.458-9.389-12.108-10.209l-158.722-23.066L269.452,20.156
c-2.527-5.121-7.741-8.361-13.451-8.361c-5.709,0-10.924,3.24-13.451,8.361l-70.988,143.826L12.843,187.049
c-5.649,0.82-10.345,4.777-12.108,10.207c-1.765,5.432-0.293,11.393,3.795,15.377l114.848,111.955L92.27,482.67
c-0.965,5.629,1.349,11.315,5.968,14.672c4.619,3.355,10.741,3.799,15.797,1.141L256,423.845l141.961,74.637
c2.195,1.154,4.591,1.723,6.979,1.723c3.11,0,6.206-0.965,8.818-2.863c4.619-3.357,6.933-9.045,5.968-14.672L392.61,324.588
l114.86-111.955C511.559,208.648,513.031,202.687,511.266,197.258z`;

    path.setAttribute("d", d);
    svg.appendChild(path);

    return svg;
  }

  icon.appendChild(createStar());

  // create some star elements to populate array


  // set the initial positions

  // Create a few tweens to run with Physics2D animation
  function animate() {
    let stars = [];
    for (var j = 0; j < 10; j++) {
      var star = createStar();
      star.style.setProperty('--hue', gsap.utils.random(0, 359))
      bg.appendChild(star);
      stars.push(star);
    }
    gsap.set(stars, {
      x: 110,
      y: 0,
      scale: "random(0.4, 1)",
      '--alpha': 1
    });

    gsap.set(icon, {
      x: 0,
      y: 3.5
    })

    // probably should use a timeline for all these tweens
    gsap.to(icon, {
      duration: .5,
      y: 10,
      //ease: Power0.easeOut
      ease: Elastic.easeOut
    });

    gsap.from(stars, {
      x: 100,
      y: 2,
      '--alpha': 0,
      zIndex: 150
    });

    gsap.timeline()
      .to(stars, {
        duration: 2,
        zIndex: 10,
        onComplete: () => {
          stars.forEach(s => s.remove())
        },
        physics2D: {
          velocity: "random(250, 400)",
          angle: "random(250, 290)",
          gravity: 450,
          friction: 0.005
        },
        rotation: 190,
        transformOrigin: "50% 50%"
      })
      .to(stars, {
        '--alpha': 0
      });

    gsap.to(icon, {
      duration: 0.5,
      y: 4,
    });

    gsap.to(submit, {
      zIndex: 100
    });
  }

  submit.addEventListener("click", animate);

  submit.addEventListener('pointerdown', () => {
    gsap.ticker.add(animate)
  })

  submit.addEventListener('pointerup', () => {
    gsap.ticker.remove(animate)
  })

  gsap.ticker.fps(24)
  // todo
  // for hitting enter multiple times id like to see more stars add into the array rather than restarting the animation

  $(function () {
    var interval = setInterval(function () {
      var counter = $('.box-time span').html();
      counter = counter - 1;
      $('.box-time span').html(counter);

      if (counter == 0) {
        clearInterval(interval);
        $('.box-time span').fadeOut();
        $('.box-time a').delay(1000).fadeIn();
      }

    }, 1000);

  });



}

var TxtType = function (el, toRotate, period, callback, lengths, audio) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.lengths = lengths;
  this.tick();
  this.isDeleting = false;
  this.callback = callback;
  this.hasCallback = false;
  this.audio = this.audio;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;


  if (this.loopNum < this.toRotate.length) {

    if (this.txt == '') {
      // console.log(this.audio);
      main.typingAudio.pause();
      main.typingAudio.currentTime = 0;
      main.typingAudio.play();
    }



    var fullTxt = this.toRotate[i];

    var margin = (document.documentElement.clientWidth - this.lengths[i] * 32) * 0.9 / 2;

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);

    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // don't delete when last message
    if (!(this.isDeleting && this.loopNum == this.toRotate.length - 1)) {

      this.el.innerHTML = `<span class="wrap" style="
      margin-left: ${margin}px;
  "> ${this.txt} </span>`;
    } else {

      if (!this.hasCallback) {
        main.typingAudio.pause();
        this.callback();
      }

      this.hasCallback = true;

      // backgroundFirework();
      // main.countdownInit();

    }
    var that = this;
    var delta = 150 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      // this.isDeleting = true;
      main.typingAudio.pause();


      this.isDeleting = true;
      if ((this.loopNum != this.toRotate.length - 1) && this.toRotate.length != 1) {
        this.el.classList.add('fade-out');


        setTimeout(() => {
          this.txt = '';
        }, 2000);
      }

      delta = 2000;




    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      this.el.classList.remove('fade-out');

      delta = 500;

    }

    setTimeout(function () {
      that.tick();
    }, delta);

  }
};

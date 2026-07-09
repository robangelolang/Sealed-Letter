 (function(){
    var petalCount = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 10;
    for(var i=0;i<petalCount;i++){
      var p = document.createElement('div');
      p.className = 'petal';
      p.style.left = Math.random()*100 + 'vw';
      p.style.animationDuration = (14 + Math.random()*12) + 's';
      p.style.animationDelay = (Math.random()*14) + 's';
      p.style.opacity = 0.15 + Math.random()*0.25;
      document.body.appendChild(p);
    }
  })();

  document.getElementById('sealBtn').addEventListener('click', function(){
    var seal = this;
    seal.classList.add('opened');
    setTimeout(function(){
      document.getElementById('cover').classList.add('hidden');
      document.getElementById('letter').style.display = 'flex';
      document.getElementById('letter').scrollIntoView({behavior:'smooth'});
    }, 550);
  });

  var reveals = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry, i){
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.4});
  reveals.forEach(function(el){ observer.observe(el); });

  var lastReveal = reveals[reveals.length - 1];
  var continueBtn = document.getElementById('continueBtn');
  var lastObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        continueBtn.classList.add('visible');
        lastObserver.disconnect();
      }
    });
  }, {threshold: 0.6});
  lastObserver.observe(lastReveal);

  continueBtn.addEventListener('click', function(){
    document.getElementById('reasons').scrollIntoView({behavior:'smooth'});
  });

  var reasons = [
    "The way you say my name like it's a whole sentence.",
    "How you remember small things I mention once, then bring them up weeks later.",
    "Your laugh when you're trying hard not to laugh.",
    "The patience you have with me on my worst days.",
    "How you make ordinary days feel like an occasion.",
    "The way you choose to fight for us instead of walking away when it's hard.",
    "Your handwriting, messy in a way that feels exactly like you.",
    "How you always ask if I've eaten.",
    "The way your voice softens right before you fall asleep on a call.",
    "How honest you are, even when it costs you something.",
    "Your stubbornness, the same trait that frustrates me and makes me trust you completely.",
    "The way you say \"I'm proud of you\" like you mean it every single time.",
    "How you turn my anxious thoughts into something we solve together.",
    "Your full name, Nicole Anne Allado, sounds like something worth writing down forever.",
    "The way you plan little surprises even when we're both buried in work.",
    "How you never once make me feel like too much.",
    "Your serious resting face, which fools everyone until you smile and ruin the disguise.",
    "The effort you put into understanding my family, my history, my mess.",
    "How \"text me when you get home\" always comes with you actually waiting for the reply.",
    "The way you hype me up before anything that scares me.",
    "How you apologize first, even when it isn't entirely your fault.",
    "Your taste, in music, in food, in the people you keep close.",
    "The comfortable silences we have now that used to feel awkward.",
    "How you remember the 7th, every single month, without being asked.",
    "The way you say \"we\" instead of \"you\" the moment something gets hard.",
    "How you can make me laugh mid-argument, which is unfair and wonderful.",
    "How steady you've stayed through 29 months of my nonsense.",
    "The future you talk about like it already includes me in it.",
    "Simply you, exactly as you are, on month 29 and every one still coming."
  ];

  var order = [];
  function reshuffle(){
    order = reasons.map(function(_, i){ return i; });
    for(var i = order.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = order[i]; order[i] = order[j]; order[j] = tmp;
    }
  }
  reshuffle();

  var shown = 0;
  var revealBtn = document.getElementById('revealBtn');
  var cardText = document.getElementById('cardText');
  var cardIndex = document.getElementById('cardIndex');
  var counter = document.getElementById('counter');

  function pad(n){ return n < 10 ? '0' + n : '' + n; }

  revealBtn.addEventListener('click', function(){
    if(shown >= reasons.length){
      shown = 0;
      reshuffle();
      counter.textContent = '00 / 29';
      cardText.classList.remove('show');
      cardIndex.textContent = '';
      revealBtn.textContent = 'reveal a reason';
      setTimeout(function(){
        cardText.textContent = 'press reveal to begin';
        cardText.classList.add('show');
      }, 260);
      return;
    }

    cardText.classList.remove('show');

    setTimeout(function(){
      var idx = order[shown];
      shown++;
      cardIndex.textContent = 'no. ' + pad(shown);
      cardText.textContent = reasons[idx];
      cardText.classList.add('show');
      counter.textContent = pad(shown) + ' / 29';

      if(shown === reasons.length){
        revealBtn.textContent = 'start again';
      }
    }, 260);
  });
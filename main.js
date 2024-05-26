function openForm() {
    document.getElementById('popupForm').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
  }

  function submitForm() {
    var inputValue = document.getElementById('inputValue').value;

    var animationContainer = document.getElementById('animationContainer');
    animationContainer.innerText = 'Hey, ' + inputValue;
    animationContainer.style.display = 'block';

    document.getElementById('popupForm').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  }
  // Wait for the document to be ready
  document.addEventListener('DOMContentLoaded', function () {
    // Open the form after a delay (e.g., 2 seconds)
    setTimeout(function () {
      openForm();
    }, 2000);
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    // Set up the canvas
    var canvas = document.getElementById('fireworksCanvas');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Firework objects
    var fireworks = [];

    // Create a Firework class
    class Firework {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.size = Math.random() * 3 + 2;
        this.speedY = Math.random() * 3 + 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.isActive = true;
      }

      update() {
        this.y -= this.speedY;
        if (this.y < 0) {
          this.isActive = false;
          createExplosions(this.x, this.y);
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size * 5);
      }
    }

    // Explosion objects
    var explosions = [];

    // Create an Explosion class
    class Explosion {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = (Math.random() - 0.5) * 8;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.life = 20;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function createExplosions(x, y) {
      for (let i = 0; i < 5; i++) {
        var explosion = new Explosion(x, y);
        explosions.push(explosion);
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create new fireworks
      if (Math.random() < 0.03) {
        fireworks.push(new Firework());
      }

      // Update and draw fireworks
      for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].draw();

        if (!fireworks[i].isActive) {
          fireworks.splice(i, 1);
        }
      }

      // Update and draw explosions
      for (let i = explosions.length - 1; i >= 0; i--) {
        explosions[i].update();
        explosions[i].draw();

        if (explosions[i].life <= 0) {
          explosions.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  });
<template>
  <div class="home">
    <nav-bar/>
    <header class="bg-dark py-5">
      <div class="container px-5">
        <div class="row gx-5 justify-content-center">
          <div class="col-lg-6">
            <div class="text-center my-5">
              <h1 class="display-5 fw-bolder text-white mb-2">
                Live in a New Way
              </h1>
              <p class="lead text-white-50 mb-4">
                Take control over your life with a fundamental change to your philosophy.
                Live healthier, grow richer, and think more critically about the world around you.
                The time to start is now.
              </p>
              <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">
                <a class="btn btn-primary btn-lg px-4 me-sm-3" href="#features"
                  >Get Started</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Features section-->
    <section class="py-5 border-bottom" id="features">
      <div class="container px-5 my-5">
        <div class="row gx-5">
          <div class="col-lg-4 mb-5 mb-lg-0">
            <div
              class="feature bg-primary bg-gradient text-white rounded-3 mb-3"
            >
              <i class="bi bi-collection"></i>
            </div>
            <h2 class="h4 fw-bolder">Health & Fitness</h2>
            <p>
              If you're interested in health and fitness, you've come to the right place. 
              Here, we experiment with different trends, workouts, and nutrition to see what works
              and what doesn't. We always learn something new and grow a little bit in the process.
            </p>
            <a class="text-decoration-none" href="#!">
              Start Here
              <i class="bi bi-arrow-right"></i>
            </a>
          </div>
          <div class="col-lg-4 mb-5 mb-lg-0">
            <div
              class="feature bg-primary bg-gradient text-white rounded-3 mb-3"
            >
              <i class="bi bi-building"></i>
            </div>
            <h2 class="h4 fw-bolder">Personal Development</h2>
            <p>
              This is the secret to changing your life. It goes by many names but it's the idea of
              continual improvement. We want to get a little bit better every day. It happens when 
              take on new ideas, step up to new challenges, consistently reflect on our performance.
            </p>
            <a class="text-decoration-none" href="#!">
              Start Here
              <i class="bi bi-arrow-right"></i>
            </a>
          </div>
          <div class="col-lg-4">
            <div
              class="feature bg-primary bg-gradient text-white rounded-3 mb-3"
            >
              <i class="bi bi-toggles2"></i>
            </div>
            <h2 class="h4 fw-bolder">Wealth Building</h2>
            <p>
              Regardless of the lifestyle you want to live, money will play a factor. If you want
              to build long term, generational wealth you need to understand the principles of money.
              If you know how it works, you can make it work for you in any economy at any time.
            </p>
            <a class="text-decoration-none" href="#!">
              Start Here
              <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
    <!-- Footer-->
    <footer class="py-5 bg-dark">
      <div class="container px-5">
        <p class="m-0 text-center text-white">
          Copyright &copy; Jake Steele 2021
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
export default {
  components: {
    NavBar,
  },
}
</script>
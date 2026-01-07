// WRITE YOUR JS CODE HERE
const todayInSpaceNav =document.getElementById("todayInSpace");
const launchesNav = document.getElementById("launches");
const planetsNav = document.getElementById("planets");
const todayInSpace =document.getElementById("today-in-space");
const launches=document.getElementById('launchesSec');
const planets = document.getElementById("planetsSec")
const launchesGrid = document.getElementById("launches-grid")
const featuredLaunch = document.getElementById("featured-launch")
const navLinks = document.querySelectorAll('.nav-link')


navLinks.forEach((link)=>{
    link.addEventListener('click',()=>{
        navLinks.forEach((link)=>{
            link.classList.remove('bg-blue-500/10')
            link.classList.remove('text-blue-400')
            link.classList.add('text-slate-300')


        })
        link.classList.add('bg-blue-500/10')
        link.classList.add('text-blue-400')
        link.classList.remove('text-slate-300')

    })
})

launchesNav.addEventListener('click',()=>{
    launches.classList.remove('hidden');
    todayInSpace.classList.add('hidden');
    planets.classList.add('hidden');
})
planetsNav.addEventListener('click',()=>{
    planets.classList.remove('hidden');
    todayInSpace.classList.add('hidden');
    launches.classList.add('hidden');
})
todayInSpaceNav.addEventListener('click',()=>{
    todayInSpace.classList.remove('hidden');
    planets.classList.add('hidden');
    launches.classList.add('hidden');
})


async function launchesDev(){
    let response = await fetch('https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10')
    let data = await response.json()
    console.log(data.results);
    displayLaunches(data.results)
    
    
}
launchesDev()


function displayLaunches(launches){

    var gridMarkup = "";
    
    for (let i = 0; i < launches.length; i++) {
        gridMarkup += `
                    <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
                <img src="${launches[i].image.image_url}" alt="rocket" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    ${launches[i].status.abbrev}
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${launches[i].name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${launches[i].image.credit}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${launches[i].net}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">23:00 UTC</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${launches[i].rocket.configuration.name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${launches[i].pad.country.alpha_3_code+" "+ launches[i].pad.country.id}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>

        
        `
    }
    launchesGrid.innerHTML = gridMarkup
    const remainingDays = Math.floor((new Date(launches[0].net).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    featuredLaunch.innerHTML = `
                <div
              class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                        ${launches[0].status.abbrev}
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                      ${launches[0].rocket.configuration.full_name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>${launches[0].image.credit}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>${launches[0].rocket.configuration.name}</span>
                      </div>
                    </div>
                    <div
                      class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                      <div>
                        <p class="text-2xl font-bold text-blue-400">${remainingDays}</p>
                        <p class="text-xs text-slate-400">Days Until Launch</p>
                      </div>
                    </div>
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">${launches[0].net.slice(0,10)}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">${launches[0].net.slice(10,)+' UTC'}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">${launches[0].pad.location.timezone_name}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">${launches[0].mission.agencies[0].country[0].alpha_3_code}</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                      ${launches[0].program[0].description}
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                    <!-- Placeholder image/icon since we can't load external images reliably without correct URLs -->
                    <div
                      class="flex items-center justify-center h-full min-h-[400px] bg-slate-800"
                    >
                        <img src="${launches[0].image.image_url}" alt="rocket" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

    `

}

// didn't work although i get my on key from nasa.api response status 500 & 504



async function planetsDev(){
    let response = await fetch('https://solar-system-opendata-proxy.vercel.app/api/planets')
    // let data = await response.json()
    console.log(response);
    
    
}
planetsDev()





async function todayDev(){
    let response = await fetch('https://api.nasa.gov/planetary/apod?api_key=rQaF20zqiAlfajMWKptjk6Hf7M90KlV0BfjqK4JD&date=2025-12-01')
    console.log(response);
    
    // let data = await response.json()
    // console.log(data);
    
    
}
todayDev()




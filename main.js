
//Explore button
let exploreBtn = document.querySelector('.title .btn'),
hadithSection = document.querySelector('.hadith');
exploreBtn.addEventListener('click',()=>{
    hadithSection.scrollIntoView({
        behavior : "smooth"
    }) 
})

let fiexdNav = document.querySelector('.header');
let scrollerBut = document.querySelector('.scorellBut');
window.addEventListener("scroll",()=>{
    window.scrollY > 100 ? fiexdNav.classList.add('active') : fiexdNav.classList.remove('active');
    if(window.scrollY > 500 ){
        scrollerBut.classList.add('active');
    }else{
        scrollerBut.classList.remove('active');
    }
})
scrollerBut.addEventListener('click',()=>{
    window.scrollTo({
        top : 0,
        behavior : "smooth"
    })
})



//Hadith Changer 

let hadithContainer = document.querySelector('.hadithContainer'),
    next = document.querySelector('.buttons .next'),
    prev = document.querySelector('.buttons .prev'),
    number = document.querySelector('.buttons .number');

let hadithIdex = 0;
getHadith();//getHadith
function getHadith(){

    fetch("https://api.hadith.sutanlab.id/books/muslim?range=1-300")
    .then(response => response.json())
    .then(data =>{
        let Hadiths = data.data.hadiths;

        changeHadith();
        next.addEventListener('click',()=>{
            hadithIdex == 299 ? hadithIdex = 0 : hadithIdex++;

            changeHadith();//changeHadith
        })

        prev.addEventListener('click',()=>{
            hadithIdex == 0 ? hadithIdex = 299 : hadithIdex--;

            changeHadith();//change hadith
        })

       function changeHadith(){
              hadithContainer.innerText = Hadiths[hadithIdex].arab;
             number.innerText = `300 - ${hadithIdex + 1}`
       }
    })

}

// lec section 

    let sections = document.querySelectorAll("section"),
       links = document.querySelectorAll('.header ul li');
    links.forEach(link => {
        link.addEventListener('click',()=>{
            document.querySelector('.header ul li.active').classList.remove('active');
            link.classList.add('active');
            let target = link.dataset.filter;
            sections.forEach(section =>{
                if(section.classList.contains(target)){
                    section.scrollIntoView({
                        behavior : "smooth"
                    })
                }
            })
        })

    })


    // suhara Api
    let surhasContainers = document.querySelector(".surhasContainer"); 
     getSuhras();
    function getSuhras(){
        fetch("http://api.alquran.cloud/v1/meta")
        .then(response => response.json())
        .then(data=>{
           let suharas = data.data.surahs.references;
           let numberOfSurahs = 114;
           surhasContainers.innerHTML = "";
           for(let i = 0 ; i < numberOfSurahs ; i++){

            surhasContainers.innerHTML +=
             `
                <div class="suhas">
                        <p>${suharas[i].name}</p> 
                        <p>${suharas[i].englishName}</p> 
                 </div>
             `
           }

           let surahaTitels = document.querySelectorAll('.suhas');
           let popUp = document.querySelector(".suhra-popup");
           let ayatContainer  = document.querySelector(".ayat");

           surahaTitels.forEach((title,index)=>{
            title.addEventListener('click',()=>{
                 fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
                 .then(response => response.json())
                 .then(data=>{
                    ayatContainer.innerHTML = "";
                    let Ayat = data.data.ayahs;
                    Ayat.forEach(aya=>{
                        popUp.classList.add('active');
                        ayatContainer.innerHTML += `
                          
                           <p>(${aya.numberInSurah}) - ${aya.text}</p>
                        `
                    })
                 })
            })

           })
           let closePopUp = document.querySelector('.close-popup');
           closePopUp.addEventListener('click',()=>{
               popUp.classList.remove('active');
           })
        })

    }


// pray time Api /// 

let cards = document.querySelector('.cards');
    getPrayTimes();
function getPrayTimes(){
    fetch("http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt Arab Emirates&method=8")
    .then(response => response.json())
    .then(data =>{
       let times = data.data.timings;
       cards.innerHTML = "";
       for(let time in times){
           
        cards.innerHTML +=
        `
            <div class="card">
                <div class="circle">
                    <svg>
                    <circle cx="100" cy="100" r="100"></circle>
                    </svg>
                  <div class="praytime">${times[time]}</div>
                </div>
                <p>${time}</p>
            </div>

        `
        
       }
    })


}


//activeSidbare

let bars = document.querySelector('.bars');
let sidebar = document.querySelector('.header ul');
bars.addEventListener('click',()=>{
    sidebar.classList.toggle('active');
})
   
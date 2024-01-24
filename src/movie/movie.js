import axios from "axios";
const list = document.querySelector('.list')
const btnContainer = document.querySelector('.btn-container')
const btnLoad = document.querySelector('.js-load-more')
let page = 1
let totalPages=2
let instance
const BASE_URL = "https://api.themoviedb.org/3"
const ENDPOINT = "/trending/movie/week"
const API_KEY = "d23ee7111563012a1c81428dff1d7a5f"

// btnLoad.addEventListener('click', onLoadMoreClick)
// fetchMovie(page=1)
//     .then(data => {
//         console.log(data)
//         list.insertAdjacentHTML("beforeend", createMarkup(data.results))
//         addEventListener()
//     })
//     .catch(error=> console.log('error in fetchMovie()', error))
    
// function onLoadMoreClick(event) {
//     page +=1
//     fetchMovie(page)
//         .then(data => {
//             console.log(data)
//             list.insertAdjacentHTML("beforeend", createMarkup(data.results))
//             if (data.page >= data.total_pages) {
//                 btnLoad.style.display= "none"
//             }
//         })

// }

function fetchMovie() {
    const params = new URLSearchParams({
    api_key: API_KEY,
    page: page
})
    return fetch(`${BASE_URL}${ENDPOINT}?${params}`)
        .then(result => {
            if (!result.ok) {
            throw new Error(result.statusText)
            }
            return result.json()
    })
}

function fetchMovieInfo(movieId) {
    return fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
        .then(result => {
            if (!result.ok) {
                throw new Error(result.statusText)
            }
            return result.json()
        })
}

function createMarkup(arr) {
    return arr.map(({ id, title, vote_average, poster_path }) =>
        `<li id="${id}" class="item">
            <img src="https://image.tmdb.org/t/p/w200${poster_path}">
            <h2>${title}</h2>
            <p class="vote">${vote_average.toFixed(1)}</p>
            <button class="more-btn">Read more...</button>
        </li>`).join('')
}

function addEventListener() {
    const moreBtn = document.querySelectorAll('.more-btn')
    moreBtn.forEach((button) => {
        button.addEventListener('click', onReadMoreClick)
    })
}

function onReadMoreClick(event) {
    const selectedMovie = event.target.closest('.item')
    fetchMovieInfo(+selectedMovie.id)
        .then(res =>  {
            instance = basicLightbox.create(`<div class="modal-box">
                <img src="https://image.tmdb.org/t/p/w200${res.poster_path}">
                <h2>${res.title}</h2>
                <p>${res.overview}</p></div>
                `)
            instance.show()  
        })
        .catch(error => {
            console.log('error onClick', error)
        })
}



window.addEventListener('keydown', onEscapePress)

function onEscapePress(event) {
    if (event.code === "Escape"&& instance)
        instance.close()
}





//!axios
// function serviceMovie(page = 1) {
//         const BASE_URL = "https://api.themoviedb.org/3"
//     const ENDPOINT = "/trending/movie/week"
//     const API_KEY = "d23ee7111563012a1c81428dff1d7a5f"

//     const params = new URLSearchParams({
//         api_key: API_KEY,
//         page: page
//     })

//     return axios.get(`${BASE_URL}${ENDPOINT}?${params}`)
//         .then(resp =>{
//             console.log(resp)
//             return resp.data
//         })
//         .catch(err => {
//         throw new Error(err)
//     })
// }
//!--------async-await
// async function render() {
//     try {
//         const data = await fetchMovie()
//         list.insertAdjacentHTML("beforeend", createMarkup(data.results))

//     } catch(error) {
//         console.log('new Error')
//     }
// }

// async function fetchMovie() {
//         const params = new URLSearchParams({
//     api_key: API_KEY,
//     page: page
//         })
//     try {
//         const res = await axios(`${BASE_URL}${ENDPOINT}?${params}`)
//         console.log(res)
//     return await res.data
//     } catch (error) {
//         throw new Error(error)
//     }
// }
// render()


//!---------infinity scroll

const guard = document.querySelector('.guard')
const options = {
    root: null,
    rootMargin: '200px',
    threshold: 0
}

const observer = new IntersectionObserver(handlePagination, options)

function handlePagination(entries, observer) {
    console.log(entries)
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            page += 1
            fetchMovie(page).then(data => {
                console.log(data)
                list.insertAdjacentHTML('beforeend', createMarkup(data.results))
                addEventListener()
                if (data.page >= data.total_pages) {
                    observer.unobserve(entry.target)
                }
            })
        }
})
}

fetchMovie(page=1)
    .then(data => {
        console.log(data)
        list.insertAdjacentHTML("beforeend", createMarkup(data.results))
        addEventListener()

        if (data.page < 3) {
            observer.observe(guard)
        }

    })
    .catch(error=> console.log('error in fetchMovie()', error))
    








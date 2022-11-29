function getDogImage() {
    return fetch("https://dog.ceo/api/breeds/image/random")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log("pet-image1", data);
            // document.getElementById("pet-image1").src = data.message;
            return data.message;
        });
}

function getWoofImage() {
    return fetch("https://random.dog/woof.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log("pet-image2", data);
            // document.getElementById("pet-image2").src = data.url;
            return data.url;
        });
}

function getFetchPromise() {
    return Promise.all([getDogImage(), getWoofImage()])
        .then(function (values) {
            console.log(values);
            document.getElementById("pet-image1").src = values[0];
            document.getElementById("pet-image2").src = values[1];
        })
        .then(function () {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve();
                }, 5000);
            });
        })
        .then(function () {
            return showModal();
        });
}

function loadImages() {
    getFetchPromise().then(function (value) {
        console.log("taco", value);

        if (value === "try-again") {
            return loadImages();
        }
    });
}

const state = {
    resolve: null,
};

function showModal() {
    document.getElementById("modal").style.display = "block";

    return new Promise(function (resolve, reject) {
        state.resolve = resolve;
    });
}

function resolveModal(value) {
    document.getElementById("modal").style.display = "none";
    state.resolve(value);
}

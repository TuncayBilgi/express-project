        main = document.querySelector("#main")
        fetch("/api/read")
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                for (const score of data) {
                    // console.log(message)

                    card = document.createElement("div")
                    card.classList.add("card")
                    cardBody = document.createElement("div")
                    cardBody.classList.add("card-body")
                    card.appendChild(cardBody)

                    element = document.createElement("h5")
                    element.classList.add("card-title")
                    element.innerText = score.pseudo
                    cardBody.appendChild(element)

                    element = document.createElement("h6")
                    element.classList.add("card-subtitle", "mb-2", "text-muted")
                    element.innerText = score.score
                    cardBody.appendChild(element)


                    main.appendChild(card)
                }
            })


npm i
npm start

!! Prilikom promjene kategorije s Home na General zbog Strict Modea se dvaput fetchaju podaci, ako se isključi onda je normalno sve.

Dodana je stranica za svaki članak, koja se otvara prilikom klika na karticu.
Za state management je korišten Redux, a u local storageu su se neki podaci iz statea pohranili kako bi se na reloadu stranice zadržao state (npr. ako se otvori stranica članka i reloada, state bi se obrisao na resetu i stranica bi failala, ovako se iz statea to povuče); nešto slično Redux Persistu

Favorites kategorija je dodana u sidebar, a članci se dodaju u favorite tako da se na stranici članka klikne na ikonu zvjezdice.
Slike koje se dobiju s API-ja su poprilično velike, na to nisam mogao utjecati. NY Times je korišten za Home page, a za ostale stranice je korišten newsAPI.
SVG ikonice sam kreirao kao zasebne komponente kako bih mogao manipulariti atributima elementa.

Prompt na vrhu stranice nestaje nakon klika na jedan od gumba i više se ne pojavljuje.
Za naslove članaka koji su dugački sam stavio horizontalni scroll jer mi tako ljepše izgleda nego da se breaka u novi red i onda odreže samo.

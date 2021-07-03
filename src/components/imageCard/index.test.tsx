import { render, fireEvent } from "@testing-library/react";

import ImageCard from ".";

const item = {
    farm: 66,
    favorite: false,
    id: "51285832182",
    isfamily: 0,
    isfriend: 0,
    ispublic: 1,
    owner: "190622906@N05",
    secret: "474b52f60e",
    server: "65535",
    title: "3rd brake light unit smart fortwo 453 Brabus Smoked Glass OEM",
};

describe('Todos', () => {    
    it('Does Image card renders?', () => {
        const {getByText, getByTestId, container} = render(<ImageCard item={item} />);        
        const elem = getByTestId('favoriteButton');
        const elemOwner = getByTestId('owner');
        const elemImg = getByTestId('image');
        expect(elemImg.getAttribute('src')).toBe(`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`)
        expect(elemOwner.innerHTML).toBe(item.owner)
        expect(elem.classList[0]).toBe('favorite-button');
        expect(elem.innerHTML).toBe('Favorite')
    })
});

/* I am not really good at writing test cases, but I will be studying this in dept and practice */
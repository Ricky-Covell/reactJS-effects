import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";

const CARDS_BASE_URL = 'https://deckofcardsapi.com/api/deck';

/**Deck: Retrieves deck from deckofcardsapi.com */
const Deck = () => {
    const [deck, setDeck] = useState(null)
    const [drawn, setDrawn] = useState([])
    const [isShuffling, setIsShuffling] = useState(false)

    useEffect(function getDeck() {
        const getData = async () => {
            const deckRes = await axios.get(`${CARDS_BASE_URL}/new/shuffle`);
            setDeck(deckRes.data);
        }
        getData();
    }, []);

    /** Draws deck when state is changed */
    const draw = async () => {
        try {
            const res = await axios.get(`${CARDS_BASE_URL}/${deck.deck_id}/draw/`);

            if (res.data.remaining === 0) throw new Error('Error: no cards remaining!');

            const card = res.data.cards[0];
            const cardObj = {
                id: card.code,
                name: `${card.suit} ${card.value}`,
                image: card.image,
            };
            setDrawn(d => [...deck, cardObj]);

        } catch (err) {
            alert(err);
        }
    }

    /** Shuffles deck when state is changed */
    const shuffle = async () => {
        setIsShuffling(true);
        try {
            await axios.get(`${CARDS_BASE_URL_BASE_URL}/${deck.deck_id}/shuffle/`);
            setDrawn([]);
        } catch (err) {
            alert(err);
        } finally {
            setIsShuffling(false);
        }
    }

    const makeShuffleButton = () => {
        if (!deck) return null;
        return (
            <button
                className='Deck-Shuffle'
                onClick={shuffle}
                disabled={isShuffling}
            >
            SHUFFLE
            </button>
        )
    }

    const makeDrawButton = () => {
        if (!deck) return null;
        return (
            <button
                className='Deck-Shuffle'
                onClick={draw}
                disabled={isShuffling}
            >
            DRAW
            </button>
        )
    }

    return (
        <main className='Deck'>
            {makeShuffleButton()}
            {makeDrawButton()}
            <div className='Card-Container'>
                { draw.map(c => (
                    <Card key={c.id} name={c.name} image={c.image} />
                ))}
            </div>
        </main>
    )
}

export default Deck;
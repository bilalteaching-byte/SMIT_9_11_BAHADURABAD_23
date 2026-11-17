# Sauda

An AI shopkeeper that haggles with buyers on behalf of a seller, so the seller is only pulled in once a buyer has agreed on a price.

## Language

**Seller**:
A person who creates a Listing and whose Shopkeeper bargains for them.
_Avoid_: Vendor, merchant, owner

**Buyer**:
A person who Haggles over a Listing. Stays anonymous to the Seller until a Deal is made.
_Avoid_: Customer, user, shopper

**Listing**:
Something a Seller puts up for sale, in one or more identical units, with a per-unit Asking Price and Floor.
_Avoid_: Item, product, ad

**Asking Price**:
The public price a seller lists a Listing at, and the opening position of every Haggle.
_Avoid_: List price, sticker price

**Floor**:
The secret lowest price a seller will accept for a Listing. Never shown to buyers or to the shopkeeper's language model.
_Avoid_: Minimum, secret minimum, floorPrice, reserve

**Haggle**:
One buyer's entire back-and-forth with the shopkeeper over one Listing, from first Offer to Deal or walk-away.
_Avoid_: Negotiation, session, chat

**Offer**:
A price a buyer proposes during a Haggle.
_Avoid_: Bid, quote

**Counter**:
A price the shopkeeper proposes back in response to an Offer.
_Avoid_: Counter-offer, reply price

**Round**:
One Offer from the buyer and the Shopkeeper's response to it. A Haggle has a fixed maximum number of Rounds.
_Avoid_: Turn, exchange

**Deal**:
The agreed per-unit price, for a chosen number of units, when an Offer or Counter is accepted. Binding on the Seller from the moment it is made.
_Avoid_: Agreement, agreed price, sale

**Reservation**:
The hold placed on a number of a Listing's units while a Deal is open, so no other Buyer can claim them.
_Avoid_: Lock, hold

**Deal Code**:
A short code given to the buyer after a Deal, shown in person at handoff to prove the agreed price.
_Avoid_: Voucher, token, receipt

**Shopkeeper**:
The persona that speaks for the seller in a Haggle, bargaining on their behalf without ever knowing the Floor.
_Avoid_: Bot, agent, assistant, AI

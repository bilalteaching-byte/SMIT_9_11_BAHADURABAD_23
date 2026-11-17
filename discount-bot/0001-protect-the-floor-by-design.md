---
status: accepted
---

# Protect the Floor by design, not by prompt

The Floor is the Seller's secret lowest price, and Sellers will only trust the Shopkeeper if it cannot leak. We decided that the Shopkeeper's language model never sees the Floor and never chooses a price: the backend decides every Counter, accept and walk-away, and the model only writes words around a price it is handed. A prompt-level promise ("never reveal the minimum") can be defeated by a determined Buyer; a model that doesn't hold the number cannot leak it.

Behavioural leaks are closed the same way. Counters follow a formula with a small random jitter and are rounded to nice numbers, so repeated Haggles don't line up into a curve that bottoms out at the Floor. A Counter never lands exactly on the Floor. In the final Round the Shopkeeper's Counter stays above the Floor, and it accepts any Offer at or above the Floor. If a Buyer's final Offer is below the Floor, the Shopkeeper repeats its last Counter once and then walks away, so it never reveals how close the Buyer came.

## Considered Options

- **Instruct the model to keep the Floor secret.** Rejected: any prompt trick that works on the model leaks the Seller's money.
- **State the Floor as "my last price" in the final Round.** Rejected: one Haggle would teach a Buyer the Floor for every similar Listing.
- **Fixed, deterministic Counter formula.** Rejected: easy to test but easy to reverse-engineer across repeated Haggles.
- **Extra Round when the Buyer is near the Floor.** Rejected: the extra Round itself signals "you were close".

## Consequences

Making the Shopkeeper "friendlier" by letting the model negotiate, or by loosening any rule above, breaks the guarantee. Tests should check that no Counter or accepted price is ever below the Floor, and that nothing sent to the model contains it.

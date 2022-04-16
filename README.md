# The-Grim-Adventures-of-Billy-and-Mandy
## This is our Frontend Capstone: Project Atelier
Project Atelier is an e-commerce product demo page where you can view various styles for a particular item, find related items, check Q&A, and see reviews.

## Before You Begin
  - [ ] `npm install`
  - [ ] `npm run build`
  - [ ] `npm run client-server`
---
## Components
  - Product Overview
  - Related Products And Outfits
  - Questions and Answers
  - Ratings and Reviews

---
### Product Overview

The product overview section has two main parts. The main image display, and the product information. These two main components are seperated into four sub components in an attempt to maximize file size. The overview section has many pieces of functionality. The main elements to highlight are as follows:

  -The Product information which is rendered onto the page dynamically based on the current product and the selected style. The average rating is shown here with a link next to it which on click will scroll to the ratings and reviews section.

  -The style selector dynamically renderes product styles in rows of four. There is no limit to the styles a product can have.

  -The main image display always shows the first image for the product and the selcected style

---
### Related Products And Outfits
![image](https://user-images.githubusercontent.com/25275753/163689419-53e00744-3743-44f8-9c94-f303925ed70c.png)
#### Related Products
  -The Related Products component dynamically renders a list of products that are related to the currently-viewed product (as determined by the HackReactor API). If the list contains more related products than will fit on the screen, arrows will appear allowing the user to scroll right & left through the options.

  -The Product card has a star button that when clicked, displays a comparing modal.

  -Clicking on a related product card will display the thumbnails of various styles.

  -Mousing over the thumbnails makes the carousel of the preview image activated to navigate various style images.

  -Clicking on a related product card again will cause the browser to navigate to that product's page.

#### Outfits
  -The Outfit component allows users to save the current product to an Outfit (similar to a shopping list). Each user's outfit list is saved in their local system storage so that it is unique to them, and can persist across browser sessions.

  -This list has an '+' card which adds the product on the current page to your outfit.

  -Clicking on the 'X' icon in the corner of a product card will remove the product from the user's outfit list.

---
### Questions and Answers
---
### Ratings and Reviews
---
## Author
  * Ian Hoffman
  * Kate Anderson
  * Owen Yoshishige
  * Dami Kim

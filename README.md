![image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![image](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![image](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![image](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)


# Project Atelier
Project Atelier is an e-commerce product demo page where you can view various styles for a particular item, find related items, check Q&A, and see reviews.
 
# Overview
### **Contributor: Ian Hoffman**
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ian-hoffman/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ihoffman117)

The product overview section has two main parts. The main image display, and the product information. These two main components are seperated into four sub components in an attempt to maximize file size. The overview section has many pieces of functionality. The main elements to highlight are as follows:

 - The Product information which is rendered onto the page dynamically based on the current product and the selected style. The average rating is shown here with a link next to it which on click will scroll to the ratings and reviews section.

 - The style selector dynamically renderes product styles in rows of four. There is no limit to the styles a product can have.

 - The main image display always shows the first image for the product and the selcected style
 
![](https://media.giphy.com/media/gD1efo9J4Ear1hEHoF/giphy.gif)

# Related Products
### **Contributor: Dami Kim**
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dami-kim/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/es98dame)

 The Related Products component dynamically renders a list of products that are related to the currently-viewed product (as determined by the HackReactor API). If the list contains more related products than will fit on the screen, arrows will appear allowing the user to scroll right & left through the options.

  - The Product card has a star button that when clicked, displays a comparing modal.

  - Clicking on a related product card will display the thumbnails of various styles.

  - Mousing over the thumbnails makes the carousel of the preview image activated to navigate various style images.

  - Clicking on a related product card again will cause the browser to navigate to that product's page.
 
 #### Outfits
  - The Outfit component allows users to save the current product to an Outfit (similar to a shopping list). Each user's outfit list is saved in their local system storage so that it is unique to them, and can persist across browser sessions.

  - This list has an '+' card which adds the product on the current page to your outfit.

  - Clicking on the 'X' icon in the corner of a product card will remove the product from the user's outfit list.
  
![](https://media.giphy.com/media/xHBjnBoD0YswYe77va/giphy.gif)


# Questions and Answers
### **Contributor: Owen Yoshishige**
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/owenyoshishige/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/OwenMY)

Displays the first two user submitted questions related to the current product. A button is displayed to reveal more questions and upon the first click will expand the view until it reaches it's max height with more questions to populate the view and initiates an infinite scroll.  Each question shows the sellers answers at the top followed by the answers sorted in order of the most helpful. There is a button inside each question to view more answers if there is more. The ability to mark specific questions and/or answers as helpful is implemented as well as the ability to report a question or answer. There is also the option to add a question and answer, both having the required data for a post and answers has the ability to upload photos.

![](https://media.giphy.com/media/zQqzihdYhYCJLMOnUC/giphy.gif)

# Ratings and Reviews
### **Contributor: Kate Anderson**
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kate-anderson-dev/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kanderson250)

Every user is able to view all reviews for the current product, an average rating, and option to submit their own review. Each review displays the reviewer specific rating, the date submitted, and optional pictures. Reviews also have the option to be marked as helpful or to report just as with the question and answer section. The average rating is displayed as a star rating ranging from 1 to 5 stars. This average based on all the review scores and displays number of reviews for each of the star options. There is also a list of product characteristics that show the average rating for each characteristic. Finally there is also an option to add your own review complete with image handling, required characteristics, and text input.

![](https://media.giphy.com/media/xopC3s1h8U4HplnqWh/giphy.gif)


## Getting Started

1. Set up config file in `server/config` using `exampleConfig.js` as an example.

2. Install your dependancies:

   > `npm install`

3. Run webpack with:

   > `npm run build`

4. Run your server:
   > `npm run client-server`

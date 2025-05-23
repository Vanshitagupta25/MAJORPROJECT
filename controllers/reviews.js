const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createreview = async(req,res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview.author);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("info" , "review is created");
  res.redirect(`/listings/${listing._id}`);

};
module.exports.destroyreview = async(req,res) => {
  let { id , reviewId} = req.params;

  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("info" , "review is deleted");
  res.redirect(`/listings/${id}`);

};
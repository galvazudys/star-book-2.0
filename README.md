# Working version of Star Book

## version 2.0.0


> Working version of star book,build with express.js and model and controller from version for just front-end.

> A project shows skills to work with 'USER STORIES', creating application with MVC.


# User Stories : 

## Behavior your app must satisfy:
on the home page a user can ...
* view a listing of all thumbnail profiles.
* create new thumbnail profiles from the home page.
* click on a thumbnail to navigate to it's main profile page
    * if no main profile exists for that thumbnail, they are redirected to the twilight zone
* view a list of all (or most recent) statuses in chronological order
* click on a status to view that user's main profile
    * if that profile has been deleted, users are alerted that this status is orphaned   

on a profile page a user can ...
* modify main profile
* delete the main profile
* modify thumbnail profile
* delete the thumbnail profile
    * if the thumbnail is deleted, your application should auto-generate an anonymous thumbnail for this profile to display on 'home' - all main profiles should be accessible
* view all statuses posted from this profile
* create a new status 
* delete old statuses  
  * if deleted, remove that status' id from the user data entry  

If a thumbnail is anonymous and it's profile is deleted, delete the thumbnail.  ie. we don't want any anonymous thumbnails that point nowhere.  

If a main profile has been deleted then recreated, statuses from the old profile should not point to the new profile.
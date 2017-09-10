# Requirements
To use it you, obviously, need to have node.js and npm installed..

# How to use it?
- Run `npm install`
- Create a `logs` folder under the project (if you want some log in case of failure)
- In `config.json` change the hard coded path for the `target_dir`
  - Note that you can add other directories
- Rename `config.sample.json` to `config.json` (will work with the sample though)
- In `config.json` add the video extensions to handle under `video_extensions`
- Run `npm run start` each time you feel like it

# Test
- Run `npm install`
- Run `npm test`

# Config file
Here is a explanation of the configuration file and an example using windows:
```javascript
{
  log_dir: "logs/", // option log dir for errors
  skip_downloading_content: true, // skip file having a `.part` sibling
  video_extensions: [ // list of extension the files should have to be renamed
    "mp4",
    "avi",
    "mkv"
  ],
  banned_words: [ // List of words being removed from name
    "Episode", "episode"
  ],
  failure_words: [ // if the name is one of this words the renaming is considered as failed
    "Anime", "anime"
  ],
  target_dir: [ // List of directories and options
    {
      path: "D:\\Animes", // Absolute path of directory
      reccursion: { // options for reccursion on subfolder. don,t specify for no reccursion
        use_dir_name: true, // for subfolder the animes will use the name of the folder
        excluded_files: [] // folders or files to exclude
      }
    }
  ]
}

```

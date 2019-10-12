import React from 'react';
import Dropzone from "react-dropzone";

const imageMaxSize = 1024 * 1024;

const SettingMenu = ({upsertFetching, user, nickHandler, sendHandler, UserUpsertAvatar, nick}) => {
    const handleOnDrop = async (files, rejectedFile) => {
        // console.log("file rejected", rejectedFile);
        if (files && files.length > 0) {
          const data = new FormData();
          data.append("photo", files[0], "photo");
    
          let res = await (await fetch("/upload", {
            method: "POST",
            headers: localStorage.authToken
              ? { Authorization: "Bearer " + localStorage.authToken }
              : {},
            body: data
          })).text();
          let avatar = JSON.parse(res);
          if (avatar._id) {
            UserUpsertAvatar(user.id, avatar._id);
          }
        }
      };

    return(
        <div className="settingsMenu">
    
          <>
            {user.nick ? <span>Change nick</span> : <span>Add nick</span>}
            <input
              name="nick"
              type="text"
              value={nick}
              onChange={nickHandler}
            />{" "}
            <button onClick={sendHandler}>Go!</button>
          </>
      <Dropzone
        onDrop={handleOnDrop}
        maxSize={imageMaxSize}
        multiple={false}
        accept="image/*"
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} className="drop_div">
              {/* <input {...getInputProps()} /> */}
              <p>Drop image here</p>
              <p>Max size 1Mb</p>
            </div>
          </section>
        )}
      </Dropzone>
      {/* <img src="http://hipstagram.asmer.fs.a-level.com.ua/images/a05e9310478fe38ec8d3824d0a41f581"/> */}
    </div>
    )
}

export default SettingMenu
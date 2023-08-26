'use strict';

module.exports = app => {
  const { Bone, DataTypes: { STRING, INTEGER, DATE, NOW } } = app.model;
  // const Wallpaper = app.model.define('wallpaper', {
  //   id: {
  //     type: INTEGER,
  //     primaryKey: true,
  //   },
  //   title: {
  //     type: STRING,
  //     // unique: true,
  //   },
  //   image1: STRING,
  //   image2: STRING,
  //   image3: STRING,
  //   image4: STRING,
  //   image5: STRING,
  //   image6: STRING,
  //   image7: STRING,
  //   image8: STRING,
  //   created_at: {
  //     type: DATE,
  //     defaultValue: NOW,
  //   },
  // });
  // return Wallpaper;

  // DOC: https://github.com/eggjs/egg-orm
  // DOC: https://leoric.js.org/api/Bone.html

  class Wallpaper extends Bone {
    static table = 'wallpaper'

    static attributes = {
      id: {
        type: INTEGER,
        primaryKey: true,
      },
      title: STRING,
      image1: {
        type: STRING,
        unique: true,
      },
      image2: {
        type: STRING,
        unique: true,
      },
      image3: {
        type: STRING,
        unique: true,
      },
      image4: {
        type: STRING,
        unique: true,
      },
      image5: {
        type: STRING,
        unique: true,
      },
      image6: {
        type: STRING,
        unique: true,
      },
      image7: {
        type: STRING,
        unique: true,
      },
      image8: {
        type: STRING,
        unique: true,
      },
      time: {
        type: DATE,
        defaultValue: NOW,
      },
      created_at: {
        type: DATE,
        defaultValue: NOW,
      },
    };
  };
  return Wallpaper;
};


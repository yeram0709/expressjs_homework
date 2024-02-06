const express = require("express");
const User = require("../models/user");

const router = express.Router();

//회원가입
router.post("/register", async (req, res) => {
    try {
      
      const user = await User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
      });
      
      
      res.status(200).json({ code: 200, message: "회원가입에 성공했습니다." });
      
    } catch (error) {
      console.log(error);
      

      res
        .status(500)
        .json({ code: 500, message: "Internal Server Error", error });
        
    }
  });
  
    

//로그인
router.post("/login", async (req, res) => {
    try {
     
      const findUserByUsername = await User.findOne({
        where: { username: req.body.username },
      });
  
     //회원정보 없는경우
      if (!findUserByUsername) {
        res
          .status(404)
          .json({ code: 404, message: "회원정보을 찾을 수 없습니다." });
        return;
      }
  
      //비밀번호가 잘못된 경우
      if (findUserByUsername.password != req.body.password) {
        res.status(404).json({ code: 400, message: "비밀번호가 다릅니다." });
        return;
      }
  
      //로그인 성공
      res.status(200).json({ code: 200, message: "로그인에 성공했습니다." });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ code: 500, message: "Internal Server Error", error });
    }
  });

//전체조회
router.get("/", async (req, res) => {
  try {
  
    const user = await User.findAll();

    
    res
      .status(200)
      .json({ code: 200, message: "전체 유저 정보를 조회합니다.", data: user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, message: "Internal Server Error", error });
  }
});

//단일조회
router.get("/:id", async (req, res) => {
    try {
   
      const id = req.params.id;
  
      
      const findUser = await User.findOne({ where: { id } });
  
     
      if (!findUser) {
        res
          .status(404)
          .json({ code: 404, message: "회원 정보를 찾을 수 없습니다." });
        return;
      }
  
    
      res
        .status(200)
        .json({ code: 200, message: "회원 정보를 조회합니다.", data: findUser });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ code: 500, message: "Internal Server Error", error });
    }
  });

//회원수정
router.put("/:id", async (req, res) => {
    try {
    
     
      const id = req.params.id;
  
      const findUser = await User.findOne({ where: { id } });
  
      if (!findUser) {
        res
          .status(404)
          .json({ code: 404, message: "회원 정보를 찾을 수 없습니다." });
        return;
      }
  
      //회원이 존재하는 경우 수정 진행
      await User.update(
       
        {
          name: req.body.name,
          username: req.body.username,
          password: req.body.password,
        },

        { where: { id } }
      );
  
      res.status(200).json({ code: 200, message: "회원 정보를 수정합니다." });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ code: 500, message: "Internal Server Error", error });
    }
  });

//회원삭제
router.delete("/:id", async (req, res) => {
    try {
      //회원 정보 확인
      const id = req.params.id;
  
      const findUser = await User.findOne({ where: { id } });
  
      if (!findUser) {
        res
          .status(404)
          .json({ code: 404, message: "회원 정보를 찾을 수 없습니다." });
        return;
      }
  
      //회원 정보가 존재하는 경우 삭제 진행
      await User.destroy({ where: { id } });
  
      res.status(200).json({ code: 200, message: "회원 정보를 삭제합니다." });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ code: 500, message: "Internal Server Error", error });
    }
  });

module.exports = router;
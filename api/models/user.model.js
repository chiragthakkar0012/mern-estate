import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    username:
    {
        type:String,
        required:true,
        unique:true
    },
   email:
    {
        type:String,
        required:true,
        unique:true
    },
    password:
    {
        type:String,
        required:true
    },
    avatar:
    {
        type:String,
        default:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAACUCAMAAADyHdbUAAAAMFBMVEXk5ueutLfP0tSqsLPn6erAxcfq7O3h4+TY29zb3t+zubzGysy8wcO3vL/S1dfJzc8bjduaAAAET0lEQVR4nO2c2ZLjIAxFWYQBA/b//+1gJ11x0umERY7EVM7bTPXDvWGTQLIQX758+fLly3kAUCtoBgCs9845by2M5gMmcKuJad5JKRnl8v9RyyoFYDHyNzF7oJZWhA9SP9EvpdbGU4t7Bwhn9HP5VwtOsJ5JL+XvFqRxbB2ACPNr+buF2TAdhMnPb9VfSJ6jg0kVyt9QDB2E97PnMI8CtdxHrKnRnx0Yy2oQavVvDlgt5Virf3fAhqn69+flYHoW+ZSw8phEULN/3rNwcADF59dvZg7BXf0GdENHavVdE2hzQH8k2x792QG1ganhBLjDEGdpvlO/lLTrGFKvfmkoJxG4bv1ypszQoPUMPkIYWfecYTcS3SqAFUG/1IQBRcchfDBgLJF8cBgzKC9jMgMKYwDyEDgiA3V5/AsDVPuQ7T/FLiQiAx5Jv9REBhzODKJbBCuaAaKsAGkNS6qYGnpTgRuRJinA2oQyNAZwzuENTWMAbQZRGUDT/x+MAM02OvwUGt7A8LvQ6OfA+CcxWiykie4XkTJKumh0+Hxg+IzMRiQDVDnx8LcSaPdCC5WB0W/mhr8bHf92GjxGOET4PoD0QkP5xIRwlpG+keWItNtApH3qtoO/EzfWOt3QgbqeevRaic54gvKF8gfbkVnyKJsbvWJr+Jq5vBOFRv1Mqha3iKKtbpSLftFaucvIQH1moCMr/S3V69SSH6lywK9/IO9FNekZk/3znuL8TEemjUwg1qIupsBr+R4BP3QfmdgGwcehO/nEq1HQ3Dp//mKC5VmqbEbpZhWXfmJlYkrXfuJoVifG6Se+sHd0bw3dzo/X0b3LB5iu7P+gVlTKplp4t6g1hHglhFUtixe7GWqBL9gmjVNh3rf7JydATiFjWNjOJ+tC0vrNOSa3v5iN8lbwOQ9AWL+YJN9pv3Mho3Kew1cn8qxZQpzLxR+mVAqK+lyeRN1P/8vDNpvIhgEmG9IfX2Co8RAXkhMapiWhFXusnx8Fq3p/+yN7lPo5APyKKX+3kGO9T4WqWX5B4tVk4RN7EtgVb+4/WJg/kK3Bglcp94xw7nIGcdavf+PUG5fldPnbpctZi3lLds/Xvy2Fc6pXQJ2x9zzH4H89BlCqCkrR6M/3gFnlWoRCjY8w+oYr0ag1IMvH9aM+wfZ9eaHDAdJ+SqQf7RWq6tNTDB0Q6kdxABTr9+CgdyUT7J8PDjpfA+350ec7B12l+W01BMh0xEUTXr9qB3OzAej/8gsG7Q0qcG72WE5jkgatZUDotJW3YxXXY7A2jQCHHehKS35DfoQdaTrOGA1AdlBf3shjC/2hvr4OoSwdFV27EfVXpeNSmyID2lc70KgzMFHL/YWu20l5LeGdqp5jPlHEgZplzCaMO1IT0nW2ZZxDxT5EnMn/QUW7E8slIFP5IvjoVXoxc0VyzCyOuDCXr2KUHk98yi9Y3F6XxI7yjhWrWFJTTgEcqdA/EP8AiJhCsxuHJNEAAAAASUVORK5CYII='
    }
    
},{timestamps:true});
const User=mongoose.model("User",userSchema);
export default User;
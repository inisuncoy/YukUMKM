import bcrypt from "bcrypt"

export default function hashPass(unHashPass) {
    return bcrypt.hash(unHashPass, 10)
        .then(function(hash) {
            return hash;
        });
}
module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          username: String,
          ci: Number,
          cellphone: Number,
          mail: String
        },
        { timestamps: true }
      )
    );
  
    return User;
  };
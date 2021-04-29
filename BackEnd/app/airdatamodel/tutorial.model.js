module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      latitude: String,
      longitude: String,
      location: String,
      co2ppm: String,
      temperature : String,
humidity: String,
airpollution: String,
dailyrating: String,
weeklyrating : String,
monthlyrating: String,
dataDate: String,

    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutorial = mongoose.model("airdata", schema);
  return Tutorial;
};

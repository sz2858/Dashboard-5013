Vue.component("line-chart", {
  extends: VueChartJs.Line,
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient2.addColorStop(0, "rgba(83,154,168, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(83,154,168, 0.5)");
    this.gradient2.addColorStop(1, "rgba(83,154,168, 0.2)");

    this.gradient.addColorStop(0, "rgba(247,108,6, 0.9)");
    this.gradient.addColorStop(0.5, "rgba(247,108,6, 0.25)");
    this.gradient.addColorStop(1, "rgba(247,108,6, 0)");

    this.renderChart(
      {
        labels: [
          "May 4",
          "May 11",
          "May 18",
          "May 25",
          "Jun 1",
          "Jun 8",
          "Jun 15",
          "Jun 22",
          "Jul 6",
          "Jul 13",
          "Jul 20",
          "Jul 27",
          "Aug 3",
          "Aug 10"
        ],
        datasets: [
          {
            label: "Active Cases",
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data: [
              3947807,
              4546274,
              5218448,
              5939956,
              6780145,
              7668748,
              8685450,
              9825630,
              11130082,
              12559607,
              14126271,
              15868642,
              17678642,
              19473566,
              20162474
            ]
          },
          {
            label: "Fatalities",
            borderColor: "#36495d",
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            borderWidth: 1,
            backgroundColor: this.gradient2,
            data: [
              276421,
              308733,
              338747,
              367846,
              398571,
              428922,
              461869,
              495830,
              528257,
              561666,
              598820,
              641182,
              681282,
              722677,
              737417
            ]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  }
});

var quiz = {
  title: "Tell Us About Yourself",
  questions: [
    {
      text: "Years in Age",
      responses: [
        {
          text: "16 or younger",
          value:
            "Your inputs do not suggest that you may have COVID-19. Nevertheless, self-monitor for any new symptoms and revisit this Symptom Checker should any develop."
        },
        {
          text: "17 to 64",
          value:
            "Your inputs do not suggest that you may have COVID-19. Nevertheless, self-monitor for any new symptoms and revisit this Symptom Checker should any develop."
        },
        {
          text: "65 or older",
          value:
            "Go to the Emergency Department at your local hospital. Please put on a surgical mask and refrain from using public transportation like the train or bus (if at all possible)"
        }
      ]
    },
    {
      text: "Do you have any chronice diseases?",
      responses: [
        {
          text: "No",
          value:
            "Your inputs do not suggest that you may have COVID-19. Nevertheless, self-monitor for any new symptoms and revisit this Symptom Checker should any develop."
        },
        {
          text: "Yes: on Dialysis/Chemotherapy",
          value:
            "Go to the Emergency Department at your local hospital. Please put on a surgical mask and refrain from using public transportation like the train or bus (if at all possible)"
        },
        {
          text: "Yes",
          value:
            "Go to the Emergency Department at your local hospital. Please put on a surgical mask and refrain from using public transportation like the train or bus (if at all possible)"
        }
      ]
    },
    {
      text:
        "Have you been in contact with a person who has been confirmed or suspected to have COVID-19?",
      responses: [
        {
          text: "No",
          value:
            "Your inputs do not suggest that you may have COVID-19. Nevertheless, self-monitor for any new symptoms and revisit this Symptom Checker should any develop."
        },
        {
          text: "Yes",
          value:
            "If you were in contact with someone you believe may have COVID-19, please isolate yourself immediately and self-monitor."
        }
      ]
    },
    {
      text: "Do you have any of the following symptoms for the past 14 days?",
      subtext:
        "Symptoms include: difficulty breathing, cough, fever over 37.5C, loss of taste/smell, sore throat or body ache",
      responses: [
        {
          text: "No",
          value:
            "Your inputs do not suggest that you may have COVID-19. Nevertheless, self-monitor for any new symptoms and revisit this Symptom Checker should any develop."
        },
        {
          text: "Yes",
          value:
            "Go to the Emergency Department at your local hospital. Please put on a surgical mask and refrain from using public transportation like the train or bus (if at all possible)"
        }
      ]
    }
  ]
};

Vue.use(ChoroplethMap);

let db = firebase.firestore();
let clinicRef = db.collection("clinics");

new Vue({
  el: "#app",
  data: {
    tabs: [
      {
        title: "World Count"
      },
      {
        title: "USA Count"
      },
      {
        title: "Symptoms Checker"
      },
      {
        title: "Pandemic Timeline"
      }
    ],
    selectedTab: "World Count",
    quiz: quiz,
    questionIndex: 0,
    userResponses: Array(),
    clinics: [],
    center: [37.8, -96],
    mapData: [
      { regionName: "Alabama", regionId: 1, cases: 99926, death: 1781 },
      { regionName: "Alaska", regionId: 2, cases: 1693, death: 25 },
      { regionName: "Arizona", regionId: 4, cases: 188737, death: 4199 },
      { regionName: "Arkansas", regionId: 5, cases: 47028, death: 515 },
      { regionName: "California", regionId: 6, cases: 574411, death: 10468 },
      { regionName: "Colorado", regionId: 8, cases: 51441, death: 1598 },
      { regionName: "Connecticut", regionId: 9, cases: 50245, death: 4437 },
      { regionName: "Delaware", regionId: 10, cases: 15365, death: 587 },
      {
        regionName: "District of Columbia",
        regionId: 11,
        cases: 12896,
        death: 593
      },
      { regionName: "Florida", regionId: 12, cases: 542792, death: 8553 },
      { regionName: "Georgia", regionId: 13, cases: 222588, death: 4351 },
      { regionName: "Hawaii", regionId: 15, cases: 2914, death: 29 },
      { regionName: "Idaho", regionId: 16, cases: 25595, death: 246 },
      { regionName: "Illinois", regionId: 17, cases: 188424, death: 7594 },
      { regionName: "Indiana", regionId: 18, cases: 75862, death: 2863 },
      { regionName: "Iowa", regionId: 19, cases: 47559, death: 912 },
      { regionName: "Kansas", regionId: 20, cases: 29717, death: 368 },
      { regionName: "Kentucky", regionId: 21, cases: 33379, death: 783 },
      { regionName: "Louisiana", regionId: 22, cases: 127246, death: 4028 },
      { regionName: "Maine", regionId: 23, cases: 3997, death: 124 },
      { regionName: "Maryland", regionId: 24, cases: 96843, death: 3604 },
      { regionName: "Massachusetts", regionId: 25, cases: 111533, death: 8470 },
      { regionName: "Michigan", regionId: 26, cases: 94656, death: 6506 },
      { regionName: "Minnesota", regionId: 27, cases: 61839, death: 1666 },
      { regionName: "Mississippi", regionId: 28, cases: 68293, death: 1944 },
      { regionName: "Missouri", regionId: 29, cases: 56383, death: 1280 },
      { regionName: "Montana", regionId: 30, cases: 5104, death: 77 },
      { regionName: "Nebraska", regionId: 31, cases: 27821, death: 340 },
      { regionName: "Nevada", regionId: 32, cases: 53557, death: 900 },
      { regionName: "New Hampshire", regionId: 33, cases: 6861, death: 419 },
      { regionName: "New Jersey", regionId: 34, cases: 185031, death: 14025 },
      { regionName: "New Mexico", regionId: 35, cases: 22315, death: 685 },
      { regionName: "New York", regionId: 36, cases: 422003, death: 25211 },
      {
        regionName: "North Carolina",
        regionId: 37,
        cases: 131267,
        death: 2092
      },
      { regionName: "North Dakota", regionId: 38, cases: 7885, death: 118 },
      { regionName: "Ohio", regionId: 39, cases: 102826, death: 3706 },
      { regionName: "Oklahoma", regionId: 40, cases: 44728, death: 618 },
      { regionName: "Oregon", regionId: 41, cases: 20225, death: 339 },
      { regionName: "Pennsylvania", regionId: 42, cases: 113241, death: 7282 },
      { regionName: "Rhode Island", regionId: 44, cases: 19611, death: 1014 },
      { regionName: "South Carolina", regionId: 45, cases: 96797, death: 1943 },
      { regionName: "South Dakota", regionId: 46, cases: 9273, death: 141 },
      { regionName: "Tennessee", regionId: 47, cases: 124915, death: 1223 },
      { regionName: "Texas", regionId: 48, cases: 500620, death: 8710 },
      { regionName: "Utah", regionId: 49, cases: 42915, death: 330 },
      { regionName: "Vermont", regionId: 50, cases: 626042, death: 58 },
      { regionName: "Virginia", regionId: 51, cases: 95867, death: 2299 },
      { regionName: "Washington", regionId: 53, cases: 60917, death: 1653 },
      { regionName: "West Virginia", regionId: 54, cases: 7277, death: 124 },
      { regionName: "Wisconsin", regionId: 55, cases: 57779, death: 978 },
      { regionName: "Wyoming", regionId: 56, cases: 2584, death: 29 }
    ],
    geoJson: null,
    colorScale: chroma.brewer.OrRd, //["e7d090", "e9ae7b", "de7062"],
    value: {
      key: "cases",
      metric: "cases"
    },
    extraValues: [
      {
        key: "death",
        metric: "cases"
      }
    ],
    mapOptions: {
      attributionControl: false
    }
  },

  methods: {
    selectTab() {
      this.selectedTab = this.tab.title;
    },
    next: function () {
      this.questionIndex++;
      console.log(this.userResponses);
    },
    // Go to previous question
    prev: function () {
      this.questionIndex--;
    },
    score: function () {
      //find the highest occurence in responses
      var modeMap = {};
      var maxEl = this.userResponses[0],
        maxCount = 1;
      for (var i = 0; i < this.userResponses.length; i++) {
        var el = this.userResponses[i];
        if (modeMap[el] == null) modeMap[el] = 1;
        else modeMap[el]++;
        if (modeMap[el] > maxCount) {
          maxEl = el;
          maxCount = modeMap[el];
        }
      }
      return maxEl;
    },
    getGeoJson() {
      axios
        .get("https://censusd3.herokuapp.com/data/us-states-geo.json")
        .then((response) => {
          // console.log('geoJson', response.data)
          this.geoJson = response.data;
          // inject feature id into properties for vue-choropleth to work
          this.geoJson.features = this.geoJson.features.map(function (feature) {
            return {
              type: "Feature",
              properties: {
                id: feature.id,
                stateName: feature.properties["{name}"]
              },
              geometry: feature.geometry
            };
          });
          // console.log('loaded map geo json', this.geoJson.features)
        })
        .catch((err) => {
          console.log("geoJson", err.response.data.error);
        });
    },
    readClinics() {
      clinicRef
        .where("avgRating", ">", 2)
        .orderBy("avgRating")
        .limit(10)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.clinics.push(doc.data());
          });
        });
    }
  },

  mounted() {
    this.getGeoJson();
    this.readClinics();
  }
});

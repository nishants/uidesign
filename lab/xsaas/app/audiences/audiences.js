(function () {
  "use strict"
  app.factory("Audiences", function () {
    var targets = [{
      id: 'demographic_id',
      api: 'demographics',
      label: 'Demographics',
      previewColumns: ["name", "min age", "max age", "gender", "countries"],
      previewTemplate: "app/audiences/preview/demographics.html",
      inlineTemplate: 'app/audiences/inline/demographics.html',
      formController: 'CreateDemographicAudienceController',
      formTemplate: 'app/demographic_audience/create.html',
    }, {
      id: 'interest_group_id',
      api: 'interest_groups',
      label: 'Interest Audience',

      previewColumns: ["name", "target"],
      previewTemplate: "app/audiences/preview/interest_groups.html",
      inlineTemplate: 'app/audiences/inline/interest_groups.html',

      formController: 'CreateInterestAudienceController',
      formTemplate: 'app/interest_audience/create.html',
    }, {
      id: 'connection_object_id',
      api: 'connection_objects',
      label: 'Connection Targeting',

      previewColumns: ["name", "connections", "excluded connections", "friends of connections", "score"],
      previewTemplate: "app/audiences/preview/connection_objects.html",
      inlineTemplate: 'app/audiences/inline/connection_objects.html',

      formController: 'CreateConnectionAudienceController',
      formTemplate: 'app/connection_audience/create.html'
    }, {
      id: 'relationship_object_id',
      api: 'relationship_objects',
      label: 'Relationship Object',

      previewColumns: ["name", "interested in", "status"],
      previewTemplate: "app/audiences/preview/relationship_objects.html",
      inlineTemplate: 'app/audiences/inline/relationship_objects.html',

      formController: 'CreateRelationAudienceController',
      formTemplate: 'app/relations_audience/create.html'
    },
      {
        id: 'language_object_id',
        api: 'language_objects',
        label: 'Language Targeting',
        previewColumns: ["name", "languages"],
        previewTemplate: "app/audiences/preview/language_objects.html",
        inlineTemplate: 'app/audiences/inline/language_objects.html',

        formController: 'CreateLanguageAudienceController',
        formTemplate: 'app/language_audience/create.html',
      }, {
        id: 'education_targeting_id',
        api: 'education_targetings',
        label: 'Education Targeting',
        previewColumns: ["name", "schools", "education", "college years", "majors"],

        previewTemplate: "app/audiences/preview/education_targetings.html",
        inlineTemplate: 'app/audiences/inline/education_targetings.html',

        formTemplate: 'app/education_audience/create.html',
        formController: 'CreateEducationAudienceController',
      },
      {
        id: 'mobile_targeting_id',
        api: 'mobile_targetings',
        label: 'Mobile Targeting',
        previewColumns: ["name", "user os", "user device"],

        previewTemplate: "app/audiences/preview/mobile_targetings.html",
        inlineTemplate: 'app/audiences/inline/mobile_targetings.html',

        formTemplate: 'app/mobile_audience/create.html',
        formController: 'CreateMobileAudienceController',
      },
      {
        id: 'work_targeting_id',
        api: 'work_targetings',
        label: 'Work Targeting',
        previewColumns: ["name", "employers", "positions", "industries"],

        previewTemplate: "app/audiences/preview/work_targetings.html",
        inlineTemplate: 'app/audiences/inline/work_targetings.html',

        formTemplate: 'app/work_audience/create.html',
        formController: 'CreateWorkAudienceController'
      },
      {
        id: 'behavior_targeting_id',
        api: 'behavior_targetings',
        label: 'Behavior Targeting',

        previewColumns: ["name", "behaviors"],
        previewTemplate: "app/audiences/preview/behavior_targetings.html",
        inlineTemplate: 'app/audiences/inline/behavior_targetings.html',

        formTemplate: 'app/behavior_audience/create.html',
        formController: 'CreateBehaviorAudienceController',
      }, {
        id: 'family_statuses_targeting_id',
        api: 'family_statuses_targetings',
        label: 'Family Status',

        previewColumns: ["name", "status"],
        previewTemplate: "app/audiences/preview/family_statuses_targetings.html",
        inlineTemplate: 'app/audiences/inline/family_statuses_targetings.html',

        formTemplate: 'app/family_status_audience/create.html',
        formController: 'CreateFamilyStatusAudienceController',
      }, {
        id: 'life_events_targeting_id',
        api: 'life_events_targetings',
        label: 'Life Events',

        previewColumns: ["name", "life events"],
        previewTemplate: "app/audiences/preview/life_events_targetings.html",
        inlineTemplate: 'app/audiences/inline/life_events_targetings.html',

        formTemplate: 'app/life_audience/create.html',
        formController: 'CreateLifeAudienceController',
      },
      {
        id: 'dpa_product_audiences',
        api: 'dpa_product_audiences',
        label: 'Dynamic Product Audience',

        previewColumns: ["name"],
        previewTemplate: "app/audiences/preview/dpa_product_audiences.html",
        inlineTemplate: 'app/audiences/inline/dpa_product_audiences.html',

        formTemplate: 'app/dpa/create_product_audience.html',
        formController: 'CreateProductAudienceController',

        multiple: true,
      },

      {
        id: 'lookalike_audiences',
        api: 'lookalike_audiences',
        label: 'Lookalike Audience',
        multiple: true,

        previewColumns: ["name"],
        previewTemplate: "app/audiences/preview/lookalike_audiences.html",
        inlineTemplate: 'app/audiences/inline/lookalike_audiences.html',

      },
      {
        id: 'custom_audiences',
        api: 'custom_audiences',
        label: 'Custom Audience',
        multiple: true,

        previewColumns: ["name"],
        previewTemplate: "app/audiences/preview/custom_audiences.html",
        inlineTemplate: 'app/audiences/inline/custom_audiences.html',
      },

      {
        id: 'excluded_custom_audiences',
        api: 'custom_audiences',
        label: 'Exclude Custom Audience',
        multiple: true,
        previewColumns: ["name"],
        previewTemplate: "app/audiences/preview/custom_audiences.html",
        inlineTemplate: 'app/audiences/inline/custom_audiences.html',

      },
      {
        id: 'excluded_lookalike_audiences',
        api: 'lookalike_audiences',
        label: 'Exclude Lookalike',
        multiple: true,

        previewColumns: ["name"],
        previewTemplate: "app/audiences/preview/lookalike_audiences.html",
        inlineTemplate: 'app/audiences/inline/lookalike_audiences.html',
      },
      {
        id: 'broad_category_audience_id',
        api: 'broad_category_audiences',
        label: 'Broad Category'
      },
    ];

    return {
      targets: function () {
        return targets;
      }
    };
  })
}).call(this);
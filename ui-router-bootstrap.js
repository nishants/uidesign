function routeDescription($routeProvider, $locationProvider) {
  $stateProvider
      .state('/behavior', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs : 'vm',
        resolve : {
          taxonomies : function(Aip) {
            return Aip.taxonomies();
          }
        }
      })
      .state('/notifications', {
        templateUrl: 'components/notifications/notifications.html',
        controller: 'NotificationsController',
        controllerAs : 'vm'
      })
      .state('/create', {
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs : 'vm'
      })
      .state('/create/dashboard', {
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs : 'vm'
      })
      .state('/create/select-campaign', {
        templateUrl: 'app/dashboard/select-campaign.html',
        controller: 'SelectCampaignController',
        controllerAs : 'vm',
        resolve: {
          campaigns: function(Campaign){
            return Campaign.all();
          }
        }
      })
      .state('/create/select-audience-group', {
        templateUrl: 'app/dashboard/select-audience-group.html',
        controller: 'SelectAudienceGroupController',
        controllerAs : 'vm',
        resolve: {
          audience_groups: function(Audience){
            return Audience.allGroups();
          }
        }
      })
      .state('/create/select-bid-params', {
        templateUrl: 'app/dashboard/select-bid-params.html',
        controller: 'SelectBidParamsController',
        controllerAs : 'vm',
        resolve : {
          placements : function(State, Campaign) {
            return Campaign.placements(State.get().campaign.id);
          },
          optimizationGoals : function(State, Adset) {
            return Adset.optimizationGoals(State.get().campaign.objective);
          },
          sets : function(State, ProductSet, $q) {
            var camp = State.get().campaign;
            if(camp.objective == 'PRODUCT_CATALOG_SALES' && camp.dpa_product_catalog_id) {
              return ProductSet.getProductSets(camp.dpa_product_catalog_id);
            } else {
              return $q.when(null);
            }
          }
        }
      })
      .state('/create/select-assets', {
        templateUrl: 'app/dashboard/select-assets.html',
        controller: 'SelectAssetsController',
        controllerAs : 'vm',
        resolve : {
          assets : function(CampaignAssets){
            return CampaignAssets.getAllAssets();
          },
          facebook_pages : function(Account){
            return Account.getFacebookPages();
          }
        }
      })
      .state('/create/select-creative', {
        templateUrl: 'app/dashboard/select-creative.html',
        controller: 'SelectCreativeController'
      })
      .state('/create/submit-campaign', {
        templateUrl: 'app/dashboard/submit-campaign.html',
        controller: 'SubmitCampaignController',
        controllerAs : 'vm'
      })
      .state('/create-campaign-asset', {
        templateUrl: 'app/campaign_assets/create.html',
        controller: 'CreateCampaignAssetController',
        controllerAs : 'vm',
        resolve : {
          assets : function(CampaignAssets){
            return CampaignAssets.getAllAssets();
          }
        }
      })
      .state('/manage-campaign-asset', {
        templateUrl: 'app/campaign_assets/manage.html',
        controller: 'ManageCampaignAssetController',
        controllerAs : 'vm',
        resolve : {
          assets : function(CampaignAssets){
            return CampaignAssets.getAssetsWithAnalytics();
          }
        }
      })
      .state('/create-audience-group', {
        templateUrl: 'app/audiences/create.html',
        controller: 'CreateAudienceGroupController',
        controllerAs: 'vm',
        resolve: {

        }
      })
      .state('/campaign/create', {
        templateUrl: 'app/campaign/create.html',
        controller: 'CreateCampaignController',
        controllerAs : 'vm',
        resolve : {
          assets : function(CampaignAssets){
            return CampaignAssets.getAllAssets();
          },
          pixels : function(Account) {
            return Account.getPixels();
          },
          appDetails : function(AppDetail) {
            return AppDetail.get();
          },
          catalogs : function(ProductCatalog) {
            return ProductCatalog.getProductCatalogs();
          }
        }
      })
      .state('/login', {
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs : 'login'
      })
      .state('/logout', {
        templateUrl: 'app/logout/logout.html',
        controller: 'LogoutController',
        controllerAs : 'logout'
      })
      .state('/audiences', {
        templateUrl: 'app/audiences/new-view.html',
        controller: 'XAudienceController',
        controllerAs : 'vm'
      })
      .state('/manage/campaigns', {
        templateUrl: 'app/campaign/manage.html',
        controller: 'ManageCampaignController',
        controllerAs : 'vm',
        resolve : {
          campaigns : function(Campaign) {
            return Campaign.allWithAnalytics(1);
          },
          pixels : function(Account) {
            return Account.getPixels();
          },
          appDetails : function(AppDetail) {
            return AppDetail.get();
          }
        }
      })
      .state('/manage/adsets', {
        templateUrl: 'app/adset/manage.html',
        controller: 'ManageAdsetController',
        controllerAs : 'vm',
        resolve : {
          adsets : function(Adset, $location) {
            return Adset.allWithAnalytics(1, $location.search().campaign_id);
          },
          audiences : function(Audience) {
            return Audience.allGroups();
          }
        }
      })
      .state('/create/app-details', {
        templateUrl: 'app/app_details/create.html',
        controller: 'CreateAppDetailsController',
        controllerAs : 'vm',
        resolve : {
        }
      })
      .state('/manage/app-details', {
        templateUrl: 'app/app_details/manage.html',
        controller: 'ManageAppDetailsController',
        controllerAs : 'vm',
        resolve : {
          appDetails : function(AppDetail) {
            return AppDetail.get();
          }
        }
      })
      .state('/manage/insertion-orders', {
        templateUrl: 'app/insertion_orders/manage.html',
        controller: 'ManageInsertionOrdersController',
        controllerAs : 'vm',
        resolve : {
          ios : function(InsertionOrder) {
            return InsertionOrder.get();
          }
        }
      })
      .state('/manage/ads', {
        templateUrl: 'app/ad/manage.html',
        controller: 'ManageAdController',
        controllerAs : 'vm',
        resolve : {
          adset : function(Adset, $location) {
            return Adset.one($location.search().adset_id);
          },
          pixels : function(Account) {
            return Account.getPixels();
          },
          ads : function(Ad, $location) {
            return Ad.allWithAnalytics($location.search().adset_id);
          }
        }
      })
      .state('/account-settings', {
        templateUrl: 'app/settings/account.html',
        controller: 'AccountSettingsController',
        controllerAs : 'vm',
        resolve : {
          account : function(Account) {
            return Account.getAccount(Account.selectedAccount().id);
          }
        }
      })
      .state('/client-settings', {
        templateUrl: 'app/settings/client.html',
        controller: 'ClientSettingsController',
        controllerAs : 'vm',
        resolve : {
          client : function(Account) {
            return Account.getClient(Account.selectedClient().id);
          },
          clients : function(Account) {
            return Account.allClients(Account.selectedAccount().id);
          },
          pixels : function(Account) {
            return Account.getPixels();
          }
          ,
          countries : function(Aip, $q) {
            return Aip.countries();
          },
          verticals : function(Aip, $q) {
            return Aip.verticals();
          }
        }
      })
      .state('/audience/custom-audience', {
        templateUrl: 'app/custom_audience/manage.html',
        controller: 'ManageCustomAudienceController',
        controllerAs : 'vm',
        resolve : {
          customAudiences : function(Audience) {
            return Audience.oneAudience('custom_audiences');
          }
        }
      })
      .state('/audience/lookalike-audience/create', {
        templateUrl: 'app/lookalike_audience/create.html',
        controller: 'CreateLookalikeAudienceController',
        controllerAs : 'vm',
        resolve : {
          pixels : function(Account) {
            return Account.getPixels();
          },
          customAudiences : function(Audience) {
            return Audience.oneAudience('custom_audiences');
          },
          adcountries : function(Facebook) {
            return Facebook.adcountries();
          }
        }
      })
      .state('/audience/lookalike-audience', {
        templateUrl: 'app/lookalike_audience/manage.html',
        controller: 'ManageLookalikeAudienceController',
        controllerAs : 'vm',
        resolve : {
          lookalikeAudiences : function(Audience) {
            return Audience.oneAudience('lookalike_audiences');
          }
        }
      })
      .state('/audience/demographic-audience', {
        templateUrl: 'app/demographic_audience/manage.html',
        controller: 'ManageDemographicAudienceController',
        controllerAs : 'vm',
        resolve : {
          demographicAudiences : function(Audience) {
            return Audience.oneAudience('demographics');
          }
        }
      })
      .state('/audience/connection-audience', {
        templateUrl: 'app/connection_audience/manage.html',
        controller: 'ManageConnectionAudienceController',
        controllerAs : 'vm',
        resolve : {
          connectionAudiences : function(Audience) {
            return Audience.oneAudience('connection_objects');
          }
        }
      })
      .state('/audience/relation-audience', {
        templateUrl: 'app/relations_audience/manage.html',
        controller: 'ManageRelationsAudienceController',
        controllerAs : 'vm',
        resolve : {
          relationAudiences : function(Audience) {
            return Audience.oneAudience('relationship_objects');
          }
        }
      })
      .state('/audience/language-audience', {
        templateUrl: 'app/language_audience/manage.html',
        controller: 'ManageLanguageAudienceController',
        controllerAs : 'vm',
        resolve : {
          languageAudiences : function(Audience) {
            return Audience.oneAudience('language_objects');
          }
        }
      })
      .state('/audience/life-event-audience', {
        templateUrl: 'app/life_audience/manage.html',
        controller: 'ManageLifeAudienceController',
        controllerAs : 'vm',
        resolve : {
          lifeAudiences : function(Audience) {
            return Audience.oneAudience('life_events_targetings');
          }
        }
      })
      .state('/audience/family-status-audience', {
        templateUrl: 'app/family_status_audience/manage.html',
        controller: 'ManageFamilyStatusAudienceController',
        controllerAs : 'vm',
        resolve : {
          familyStatusAudiences : function(Audience) {
            return Audience.oneAudience('family_statuses_targetings');
          }
        }
      })
      .state('/audience/broad-category-audience', {
        templateUrl: 'app/broad_category_audience/manage.html',
        controller: 'ManageBroadCategoryAudienceController',
        controllerAs : 'vm',
        resolve : {
          broadCategoryAudiences : function(Audience) {
            return Audience.oneAudience('broad_category_audiences');
          }
        }
      })
      .state('/audience/education-audience', {
        templateUrl: 'app/education_audience/manage.html',
        controller: 'ManageEducationAudienceController',
        controllerAs : 'vm',
        resolve : {
          educationAudiences : function(Audience) {
            return Audience.oneAudience('education_targetings');
          }
        }
      })
      .state('/audience/mobile-audience', {
        templateUrl: 'app/mobile_audience/manage.html',
        controller: 'ManageMobileAudienceController',
        controllerAs : 'vm',
        resolve : {
          mobileAudiences : function(Audience) {
            return Audience.oneAudience('mobile_targetings');
          }
        }
      })
      .state('/audience/work-audience', {
        templateUrl: 'app/work_audience/manage.html',
        controller: 'ManageWorkAudienceController',
        controllerAs : 'vm',
        resolve : {
          workAudiences : function(Audience) {
            return Audience.oneAudience('work_targetings');
          }
        }
      })
      .state('/audience/behavior-audience', {
        templateUrl: 'app/behavior_audience/manage.html',
        controller: 'ManageBehaviorAudienceController',
        controllerAs : 'vm',
        resolve : {
          behaviorAudiences : function(Audience) {
            return Audience.oneAudience('behavior_targetings');
          }
        }
      })
      .state('/audience/interest-audience', {
        templateUrl: 'app/interest_audience/manage.html',
        controller: 'ManageInterestAudienceController',
        controllerAs : 'vm',
        resolve : {
          interestGroups : function(Audience) {
            return Audience.oneAudience('interest_groups');
          }
        }
      })
      .state('/audience/interest-audience/create', {
        templateUrl: 'app/interest_audience/create.html',
        controller: 'CreateInterestAudienceController',
        controllerAs : 'vm',
        resolve : {

        }
      })
      .state('/audience/demographic-audience/create', {
        templateUrl: 'app/demographic_audience/create.html',
        controller: 'CreateDemographicAudienceController',
        controllerAs : 'vm',
        resolve : {
        }
      })
      .state('/audience/connection-audience/create', {
        templateUrl: 'app/connection_audience/create.html',
        controller: 'CreateConnectionAudienceController',
        controllerAs : 'vm',
      })
      .state('/audience/relation-audience/create', {
        templateUrl: 'app/relations_audience/create.html',
        controller: 'CreateRelationAudienceController',
        controllerAs : 'vm',
      })
      .state('/audience/language-audience/create', {
        templateUrl: 'app/language_audience/create.html',
        controller: 'CreateLanguageAudienceController',
        controllerAs : 'vm'
      })
      .state('/audience/life-event-audience/create', {
        templateUrl: 'app/life_audience/create.html',
        controller: 'CreateLifeAudienceController',
        controllerAs : 'vm'
      })
      .state('/audience/family-status-audience/create', {
        templateUrl: 'app/family_status_audience/create.html',
        controller: 'CreateFamilyStatusAudienceController',
        controllerAs : 'vm'
      })
      .state('/audience/broad-category-audience/create', {
        templateUrl: 'app/broad_category_audience/create.html',
        controller: 'CreateBroadCategoryAudienceController',
        controllerAs : 'vm',
        resolve : {
          pixels : function(Account) {
            return Account.getPixels();
          },
          customAudiences : function(Audience) {
            return Audience.oneAudience('custom_audiences');
          },
          adcountries : function(Facebook) {
            return Facebook.adcountries();
          }
        }
      })
      .state('/audience/education-audience/create', {
        templateUrl: 'app/education_audience/create.html',
        controller: 'CreateEducationAudienceController',
        controllerAs : 'vm',
      })
      .state('/audience/mobile-audience/create', {
        templateUrl: 'app/mobile_audience/create.html',
        controller: 'CreateMobileAudienceController',
        controllerAs : 'vm',
      })
      .state('/audience/work-audience/create', {
        templateUrl: 'app/work_audience/create.html',
        controller: 'CreateWorkAudienceController',
        controllerAs : 'vm',
      })
      .state('/audience/behavior-audience/create', {
        templateUrl: 'app/behavior_audience/create.html',
        controller: 'CreateBehaviorAudienceController',
        controllerAs : 'vm',
      })
      .state('/reporting', {
        templateUrl: 'app/reporting/reporting.html',
        controller: 'ReportingController',
        controllerAs : 'vm',
        resolve : {
        }
      })
      .state('/missed-call-reporting', {
        templateUrl: 'app/missed_call/reporting.html',
        controller: 'MissedCallReportingController',
        controllerAs : 'vm',
        resolve : {
        }
      })
      .state('/dpa/product-catalog', {
        redirectTo : '/dpa/product-catalog/manage'
      })
      .state('/dpa/product-catalog/manage', {
        templateUrl: 'app/dpa/manage_product_catalog.html',
        controller: 'ManageProductCatalogController',
        controllerAs : 'vm',
        resolve : {
          catalogs : function(ProductCatalog) {
            return ProductCatalog.getProductCatalogs();
          },
          pixels : function(Account) {
            return Account.getAudiencePixels();
          }
        }
      })
      .state('/dpa/product-catalog/create', {
        templateUrl: 'app/dpa/create_product_catalog.html',
        controller: 'CreateProductCatalogController',
        controllerAs : 'vm',
        resolve : {
        }
      })
      .state('/dpa/product-catalog/:id/feeds', {
        templateUrl: 'app/dpa/manage_product_feed.html',
        controller: 'ManageProductFeedController',
        controllerAs : 'vm'
      })
      .state('/dpa/product-catalog/:id/feed/create', {
        templateUrl: 'app/dpa/create_product_feed.html',
        controller: 'CreateProductFeedController',
        controllerAs : 'vm'
      })
      .state('/dpa/product-catalog/:id/sets', {
        templateUrl: 'app/dpa/manage_product_set.html',
        controller: 'ManageProductSetController',
        controllerAs : 'vm'
      })
      .state('/dpa/product-catalog/:id/set/create', {
        templateUrl: 'app/dpa/create_product_set.html',
        controller: 'CreateProductSetController',
        controllerAs : 'vm'
      })
      .state('/dpa/product-audiences', {
        redirectTo : '/dpa/product-audience/manage'
      })
      .state('/dpa/product-audience/manage', {
        templateUrl : 'app/dpa/manage_product_audience.html',
        controller : 'ManageProductAudienceController',
        controllerAs : 'vm'
      })
      .state('/dpa/product-audience/create', {
        templateUrl : 'app/dpa/create_product_audience.html',
        controller : 'CreateProductAudienceController',
        controllerAs : 'vm',
        resolve : {
          productCatalog : function(ProductCatalog) {
            return ProductCatalog.getProductCatalogs()
          },
          pixels : function(Account) {
            return Account.getPixels();
          }
        }
      })
      .state('/triggers', {
        redirectTo : '/triggers/manage'
      })
      .state('/triggers/manage', {
        templateUrl: 'app/trigger/manage.html',
        controller: 'ManageTriggerController',
        controllerAs : 'vm',
        resolve : {

        }
      })
      .state('/triggers/create', {
        templateUrl: 'app/trigger/create.html',
        controller: 'CreateTriggerController',
        controllerAs : 'vm',
      })

      .state('/welcome', {
        templateUrl: 'app/user-manage/welcome.html',
        controller: 'WelcomeController',
        controllerAs : 'vm',
      })
      .state('/su-admin', {
        templateUrl: 'app/user-manage/admin.html',
        controller: 'AdminController',
        controllerAs : 'vm',
      })
      .state('/404', {
        templateUrl: 'app/404/404.html',
        controller: '404Ctrl',
        controllerAs : 'vm',
      })
      .otherwise({
        redirectTo: '/create/dashboard'
      });

}
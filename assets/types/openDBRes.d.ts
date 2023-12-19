type BookResponse = {
  onix: Onix; // JPRO-onix compliant items
  hanmoto: Hanmoto; // Items unique to hanmoto.com
  summary: Summary; // Basic information
};

type Onix = {
  recordReference: string; // ISBN code
  productIdentifier: {
    idValue: string; // ISBN code
    productIDType: string; // ISBN code
  };
  descriptiveDetail: {
    productComposition: string; // Set product sales availability
    productFormDetail: string; // Format
    measure: {
      measureType: string;
      measureUnitCode: string;
      measurement: string;
    }[];
    productPart: {
      numberOfItemsOfThisForm: number;
      productForm: string;
      productFormDescription: string;
    }[];
    collection: {
      titleDetail: {
        titleType: string;
        titleElement: {
          titleElementLevel: string;
          titleText: {
            content: string;
            collationKey: string;
          };
        }[];
      };
      collectionType: string;
    };
    titleDetail: {
      titleType: string;
      titleElement: {
        titleElementLevel: string;
        titleText: {
          content: string;
          collationkey: string;
        };
      };
    };
    contributor: {
      contributorRole: string[];
      personName: {
        content: string; // Name
        collationkey: string; // Collation key
      };
      biographicalNote: string; // Author biography
      sequenceNumber: number;
    }[];
    language: {
      languageCode: string;
      languageRole: string;
      countryCode: string;
    }[];
    extent: {
      extentValue: number;
      extentUnit: string;
      extentType: string;
    }[];
    productForm: string;
    subject: {
      subjectSchemeIdentifier: string;
      subjectCode: string;
      subjectHeadingText: string;
    }[];
    audience: {
      audienceCodeType: string;
      audienceCodeValue: string;
    }[];
  };
  measure: {
    measureType: string;
    measureUnitCode: string;
    measurement: string;
  }[];
  collateralDetail: {
    textContent: {
      text: string;
      textType: string;
      contentAudience: string;
    }[];
    supportingResource: {
      resourceContentType: string; // ISBN code
      resourceMode: string;
      contentAudience: string;
      resourceVersion: {
        resourceLink: string; // Image path
        resourceForm: string;
        resourceVersionFeature: {
          resourceVersionFeatureType: string;
          featureValue: string;
        }[];
      }[];
    }[];
  };
  publishingDetail: {
    imprint: {
      imprintName: string;
      imprintIdentifier: {
        idValue: string;
        imprintIDType: string;
      }[];
    };
    publisher: {
      publisherIdentifier: {
        publisherIDType: string;
        idValue: string;
      }[];
      publisherName: string;
      publishingRole: string;
    };
    publishingDate: {
      date: string;
      publishingDateRole: string;
    }[];
  };
  notificationType: string;
  productSupply: {
    supplyDetail: {
      returnsConditions: {
        returnsCode: string;
        returnsCodeType: string;
      };
      productAvailability: string;
      price: {
        priceAmount: number;
        currencyCode: string;
        priceType: string;
      }[];
    };
  };
};

type Hanmoto = {
  dateshuppan: string; // Publication date
  datemodified: string; // Information update date and time
  datecreated: string; // Information creation date and time
  lanove: boolean; // Light novel flag
  hasshohyo: string; // Flag for review data availability
  hastameshiyomi: boolean; // Flag for trial reading availability
  reviews: {
    han: string; // Edition
    appearance: string; // Publication date
    postUser: string; // Contributor
    kubunID: number; // Source category ID
    source: string; // Source
    choyukan: string; // Morning / evening edition
    sourceID: number; // Source ID
    reviewer: string; // Reviewer
    link: string; // Link
  }[];
  // Items unique to hanmoto.com members ->
  genshomei: string; // Original book title
  han: string; // Edition
  datejuuhanyotei: string; // Scheduled reprint date
  datezeppan: string; // Out of print date
  // Other unique fields... (omitting for brevity)
};

type Summary = {
  publisher: string;
  ISBN: string;
  pubdate: string;
  title: string;
  series: string;
  author: string;
  cover: string;
  volume: string;
};

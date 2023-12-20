type BookResponse = {
  onix: Onix; // JPRO-onix compliant items
  hanmoto: Hanmoto; // Items unique to hanmoto.com
  summary: Summary; // Basic information
};

type Onix = {
  RecordReference: string; // ISBN code
  productIdentifier?: {
    idValue: string; // ISBN code
    productIDType: string; // ISBN code
  };
  DescriptiveDetail: {
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
    Collection: {
      TitleDetail: {
        titleType: string;
        TitleElement: {
          TitleElementLevel: string;
          TitleText: {
            content: string;
            collationKey: string;
          };
        }[];
      };
      CollectionType: string;
    };
    TitleDetail: {
      TitleType: string;
      TitleElement: {
        TitleElementLevel: string;
        TitleText: {
          content: string;
          collationkey: string;
        };
      };
    };
    Contributor: {
      ContributorRole: string[];
      PersonName: {
        content: string; // Name
        collationkey: string; // Collation key
      };
      biographicalNote: string; // Author biography
      SequenceNumber: number;
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
  measure?: {
    measureType: string;
    measureUnitCode: string;
    measurement: string;
  }[];
  CollateralDetail?: {
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
  PublishingDetail: {
    Imprint: {
      ImprintName: string;
      imprintIdentifier?: {
        idValue: string;
        imprintIDType: string;
      }[];
    };
    publisher?: {
      publisherIdentifier: {
        publisherIDType: string;
        idValue: string;
      }[];
      publisherName: string;
      publishingRole: string;
    };
    PublishingDate: {
      Date: string;
      PublishingDateRole: string;
    }[];
  };
  notificationType?: string;
  ProductSupply: {
    SupplyDetail: {
      returnsConditions?: {
        returnsCode: string;
        returnsCodeType: string;
      };
      ProductAvailability: string;
      Price: {
        PriceAmount: number;
        CurrencyCode: string;
        PriceType: string;
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
    post_user: string; // Contributor
    kubun_id: number; // Source category ID
    source: string; // Source
    choyukan: string; // Morning / evening edition
    source_id: number; // Source ID
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
  isbn: string;
  pubdate: string;
  title: string;
  series: string;
  author: string;
  cover: string;
  volume: string;
};

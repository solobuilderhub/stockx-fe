
// consts needed for the form
export const ProductVisibility = {
    PUBLIC : 'public',
    PRIVATE : 'private',
    DRAFT : 'draft',
    ARCHIVED : 'archived'
  }
  
  export const MediaUsage = {
    PRODUCT_IMAGE : 'product_image',
    AVATAR : 'avatar',
    CATEGORY_IMAGE : 'category_image',
    DIGITAL_ASSET : 'digital_asset',
    GENERAL : 'general'
  }
  
  export const MediaType = {
    IMAGE : 'image',
    VIDEO : 'video',
    AUDIO : 'audio',
    DOCUMENT : 'document',
    ARCHIVE : 'archive',
    OTHER : 'other'
  }
  
  export const FileDeliveryMethod = {
    DOWNLOADABLE : 'downloadable',
    EXTERNAL_LINK : 'external_link',
    MAIL_ACCESS : 'mail_access',
  }

  export const FileDeliveryMethodMapper = {
    [FileDeliveryMethod.DOWNLOADABLE] : 'Downloadable',
    [FileDeliveryMethod.EXTERNAL_LINK] : 'External Link',
    [FileDeliveryMethod.MAIL_ACCESS] : 'Mail Access',
  }
  
  export const DiscountType = {
    PERCENTAGE : 'percentage',
    FIXED : 'fixed',
  }
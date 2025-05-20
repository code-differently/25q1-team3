export class ImageMappingService {
  private static instance: ImageMappingService;
  private static readonly imageMap: Record<string, string> = {
    education: '/images/pic02.jpg',
    sports: '/images/pic03.jpg',
    art: '/images/pic01.jpg',
    default: '/images/pic02.jpg'
  };

  private constructor() {}

  public static getInstance(): ImageMappingService {
    if (!ImageMappingService.instance) {
      ImageMappingService.instance = new ImageMappingService();
    }
    return ImageMappingService.instance;
  }

  public getImageForProgram(type?: string): string {
    if (!type) return ImageMappingService.imageMap.default;
    
    const key = Object.keys(ImageMappingService.imageMap).find(k => 
      type.toLowerCase().includes(k)
    );
    
    return key ? ImageMappingService.imageMap[key] : ImageMappingService.imageMap.default;
  }

  public addImageMapping(type: string, imagePath: string): void {
    ImageMappingService.imageMap[type.toLowerCase()] = imagePath;
  }
} 
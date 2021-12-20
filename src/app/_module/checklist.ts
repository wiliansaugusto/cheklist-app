import { Category } from 'src/app/_module/category';
export class Checklist {

  public guid!: string;
  public descripition!: string;
  public deadline!: Date;
  public postDate!: Date;
  public category!: Category;
  public completed!: boolean;


}

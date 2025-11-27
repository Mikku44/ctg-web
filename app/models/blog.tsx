

export interface IBlogModel {
    id ? :string;
    title : string;
    slug : string;
    excerpt : string;
    tags : string;
    author : string;
    images : string [];
    publish_at? : string | null;
    contents : string;
}
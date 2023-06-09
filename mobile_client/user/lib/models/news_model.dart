class News {
  String id;
  String title;
  String content;
  String time;
  String image;
  List<dynamic> categories;
  String parent;

  News({
    required this.id,
    required this.title,
    required this.content,
    required this.time,
    required this.image,
    required this.categories,
    required this.parent,
  });
}

import 'package:flutter/material.dart';
import 'package:user/utils/text/body_text.dart';
import 'package:user/utils/text/title_text.dart';

class ListTileHomeTab extends StatelessWidget {
  final String title;
  final String subTitle;
  final Widget? image;
  final void Function() onTap;
  const ListTileHomeTab({super.key, required this.title, required this.subTitle, this.image, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      splashColor: Colors.grey.withOpacity(0.1),
      customBorder: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      onTap: onTap,
      child: Row(
        children: [
          SizedBox(
            width: 75,
            height: 65,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: FittedBox(fit: BoxFit.fill, child: image),
            ),
          ),
          Expanded(
            child: Container(
              padding: const EdgeInsets.only(left: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.max,
                children: [
                  TextTitle(text: title, overflow: TextOverflow.ellipsis),
                  const SizedBox(height: 5),
                  TextBody(text: subTitle, overFlow: TextOverflow.ellipsis),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

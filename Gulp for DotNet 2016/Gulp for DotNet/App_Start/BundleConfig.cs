using System.Web;
using System.Web.Optimization;

namespace Gulp_for_DotNet
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            //ERROR: Invalid pattern: '~/js/**/*.js'. Wildcards are only allowed in the last path segment, can contain only one leading or trailing wildcard, and cannot be used with {version}. 
            //bundles.Add(new ScriptBundle("~/bundles/myscripts").Include( "~/js/**/*.js"));
            bundles.Add(new ScriptBundle("~/bundles/myscripts")
                .IncludeDirectory("~/js", "*.js", true));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
        }
    }
}
